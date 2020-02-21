const multer = require("multer");
const path = require("path");
const randomstring = require("randomstring");

const diskStorage = multer.diskStorage({
  destination: "./resource/image",
  filename: function (req, file, cb) {
    const randomPart = randomstring.generate(8); // use whatever random you want.
    const extension = file.mimetype.split('/')[1];
    cb(null, 'PlaceImage-'+ randomPart + `.${extension}`)
  }
});

module.exports = {
  upload: multer({ storage: diskStorage }),
  uploadFile: (req, res, next) => {
    const filename = req.file.filename;
    res.json({
      success: true,
      filename: filename
    });
  },
  getFile: (req, res, next) => {
    var jsonPath = path.join(__dirname, "..", "resource/image", req.params.url);
    res.sendFile(jsonPath);
  }
};