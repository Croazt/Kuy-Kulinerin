require("dotenv").config();
const db = require("../database");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const ADMIN_KEY = process.env.ADMIN_KEY;
const VERIF_KEY = process.env.VERIF_KEY;
const login = require("../services/userServices");
const sendMail = require("../helper/mailHelper");

signToken = user => {
  return jwt.sign(
    {
      nama: user.nama,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      iat: new Date().getTime() / 1000
    },
    VERIF_KEY,
    { expiresIn: "2days" }
  );
};

const regUser = async (req, res, next) => {
  const { email, password, phone, username, nama } = req.value.body;
  const [
    rows
  ] = await db.query("select * from users where email = ? or username = ?", [
    email,
    username
  ]);
  if (rows.length === 0) {
    const token =
      "http://kulinerin.pagekite.me/user/verify/" + signToken(req.value.body);
    console.log(req.value.body);
    try {
      sendMail.sendEmail(token, email);
      res.status(200).json({
        success: true,
        message: "verify link has been sent to your email"
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err
      });
    }
  } else {
    res.status(406);
    const error = new Error("User Already Registered");
    next(error);
  }
};

const regUsers = async (req, res, next) => {
  const { email, password, phone, username, nama } = req.user;
  const role = 1;
  const hashedPassword = await bcrypt.hash(password, 11);
  db.query(
    "insert into users(nama, email, password,phone,username,role) values ( ?, ?, ?, ?, ? ,?)",
    [nama, email, hashedPassword, phone, username, role]
  )
    .then(() => {
      res.json({
        success: true,
        message: "Register success"
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

const loginUser = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const [
    rows
  ] = await db.query("select * from users where email = ? and username = ?", [
    email,
    username
  ]);
  if (rows.length != 0) {
    const password = req.body.password;
    login.login(rows[0], password, res, next);
  } else if (rows.username || rows.email) {
    res.status(406);
    const error = new Error("It seems you seems not registered yet");
    next(error);
  } else if (username == null || email == null) {
    res.status(412);
    const error = new Error("Please input valid email or username");
    next(error);
  } else {
    res.status(412);
    const error = new Error("Please input valid email or username");
    next(error);
  }
};

const upUser = async (req, res, next) => {
  const [rows] = await db.query("select * from users where username = ?", [
    req.params.id
  ]);
  if (rows.length != 0) {
    const id_user = req.user.username;
    if (id_user === req.params.id) {
      const { email, password, phone, username, nama } = req.value.body;
      console.log(rows);
      const isVerified = await bcrypt.compare(password, rows[0].password);
      if (isVerified) {
        db.query(
          "update users set nama = ?, email = ?, phone= ?, username = ? where username = ?",
          [nama, email, phone, username, id_user]
        )
          .then(() => {
            res.status(201).json({
              success: true,
              message: "Update success"
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: err
            });
          });
      } else {
        res.status(412);
        const error = new Error("Password didn't match");
        next(error);
      }
    } else {
      res.status(401);
      const error = new Error("You are not recognized as " + req.params.id);
      next(error);
    }
  } else {
    res.status(404);
    const error = new Error("User not Found");
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const [rows] = await db.query("select * from users where username = ?", [
    req.params.id
  ]);
  if (rows.length != 0) {
    const id_user = req.user.username;
    if (id_user === req.params.id) {
      const { password, newPassword } = req.body;
      console.log(rows);
      const isVerified = await bcrypt.compare(password, rows[0].password);
      if (isVerified) {
        const hashedPassword = await bcrypt.hash(newPassword, 11);
        db.query("update users set password = ?", [hashedPassword])
          .then(() => {
            res.status(200).json({
              success: true,
              message: "Update password success"
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              error: err
            });
          });
      } else {
        res.status();
        const error = new Error("Password didn't match");
        next(error);
      }
    } else {
      res.status(401);
      const error = new Error("You are not recognized as " + req.params.id);
      next(error);
    }
  } else {
    res.status(404);
    const error = new Error("User not Found");
    next(error);
  }
};

const reqUser = async (req, res, next) => {
  const id = req.params.id;
  const [rows] = await db.query(
    "select id,nama,username, email,phone,balance from users where username = ?",
    [id]
  );
  if (rows.length > 0) {
    res.json({
      success: true,
      users: rows[0]
    });
  } else {
    res.status(404);
    const error = new error("user not found");
    next(error);
  }
};

const delUser = async (req, res, next) => {
  const { username } = req.user;
  const id = req.params.id;
  const [
    rows
  ] = await db.query(
    "select id,nama,username, email,phone from users where username = ?",
    [id]
  );
  if (rows.length > 0) {
    if (username === id) {
      db.query("delete from user where username = ?", [username])
        .then(() => {
          res.status(200).json({
            Success: true,
            Message: "Delete users success"
          });
        })
        .catch(err => {
          next(err);
        });
    } else {
      res.status(403);
      const error = new error("You have no right to do that");
      next(error);
    }
  } else {
    res.status(404);
    const error = new error("user not found");
    next(error);
  }
};

const userController = {
  regUser,
  loginUser,
  upUser,
  reqUser,
  delUser,
  regUsers,
  changePassword
};

module.exports = userController;
