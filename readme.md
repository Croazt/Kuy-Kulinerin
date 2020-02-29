# API CONTRACT

# MODEL

## User

- id: Int
- nama: String
- email: String
- username : String
- password: String
- phone : String
- role : Int
- superadmin : int
- balance : Bigint
- tempBalance : Bigint
- googleId : string

## Place

- id: Int
- nama : String
- Location : String
- rating : double
- coworking : int
- kuliner : int
- googlemap : String
- lowprice : int
- highprice : int
- opentime : time
- closetime : time
- description : String
- image : String
- alamat : String
- recomended : int

## Admin

- id: Int
- nama: String
- email: String
- username : String
- password: String
- phone : String
- role : Int

## Menu

- id : Int
- id_places : Int
- nama : String
- harga : BIGINT

# ENDPOINT

## User (/user)

### Register User (POST /register)

#### url : localhost:99/user/register

**_Request (body): JSON_**

    {
        “name”      : “Muhammad Fachry Noorchoolish Arif”,
        “email”     : “kuykulinerin@gmail.com”,
        “username”  : “Croazt”,
        “phone”     : “085340907028”,
        “password”  : “Yoimen99”
    }

**_Response: JSON_**

    200:
        {
            “success”   : true,
            “message”   : “verify link has been sent to your email”
        }

    406:
        {
            “success”   : false,
            “message”   : “Email already registered”
        }

    400:
        {
            "isJoi": true,
            "name": "ValidationError",
            "details": [
                    {
                    "message": "\"email\" must be a valid email",
                    "path": [
                        "email"
                    ],
                    "type": "string.email",
                    "context": {
                        "value": "WWOKEgmail.com",
                        "key": "email",
                        "label": "email"
                    }
                }
            ],
        }


    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

### Login User (POST /login)

#### url : localhost:99/user/login

**_Request (Body): JSON_**

    {
        “email”     : “kuykulinerin@gmail.com”,
        “username”  : “Croazt”,
        "password”  : “Yoimen33”
    }

**_Response: JSON_**

    202 :
        {
            “success” : true,
            “token” : “12c312c039n089qc0sa”,
            “message” : “YOU LOGIN AS USER”

        }

    or  
    202 :
        {
            “success” : true,
            “token” : “12c312c039n089qc0sa”,
            “message” : “YOU LOGIN AS ADMIN”

        }
    
    or
    202 :
        {
            “success” : true,
            “token” : “12c312c039n089qc0sa”,
            “message” : “YOU LOGIN AS SELLER”

        }       

    403:
        {
            “success” : false,
            “message” : “Wrong username or password”
        }   

    406:  
        {
            “success”: false,
            “message”: “It seems you have not registered yet”
        }
    412
        {
            “success”: false,
            “message”: “Please input valid email or username”   
        }
    500:  
        {
            “success” : false,
            “message” : “internal server error”
        }

### Update User (POST /:id/update)

#### url : localhost:99/user/:id/update

**_Request (params) : (required) id_**

**_Request (body): JSON_**

    {
        “nama”     : “AYOLAH”,
        “username”  : “Bolehlah”,
        “email”     : “kuykulinerin@gmail.com”,
        “phone”  : “085340907028”,
    }

**_Response: JSON_**

        201:
        {
            “success”: true,
            “message”: “Update success”
        }

        400:
        {
            "isJoi": true,
            "name": "ValidationError",
            "details": [
                    {
                        "message": "\"email\" must be a valid email",
                        "path": [
                            "email"
                        ],
                        "type": "string.email",
                        "context": {
                            "value": "WWOKEgmail.com",
                            "key": "email",
                            "label": "email"
                    }
                }
            ],
        }

    412:
    {
        “success”: false
        “message”: “Password didn't match”
    }

    401:
    {
        “success”: false
        “message”: “You are not recognized as %{id}”
    }

    500:
    {
        “success” : false,
        “message” : “internal server error”
    }

### Change User Password (POST /:id/update)

#### url : localhost:99/user/:id/update

**_Request (params) : (required) id_**

**_Request (body): JSON_**

    {
        “password”     : “ApaAjaBoleh”,
        “newPassword”  : “Bolehlah”,
    }

**_Response: JSON_**

    202:
    {
        “success”: true,
        “message”: “Update password success”
    }

    400:
    {
        "isJoi": true,
        "name": "ValidationError",
        "details": [
                {
                    "message": "\"email\" must be a valid email",
                    "path": [
                        "email"
                    ],
                    "type": "string.email",
                    "context": {
                        "value": "WWOKEgmail.com",
                        "key": "email",
                        "label": "email"
                }
            }
        ],
    }

    404:
    {
        “success”: false
        “message”: “You are not recognized as %{id}”
    }

    401:
    {
        “success”: false
        “message”: “You are not recognized as %{id}”
    }

    500:
    {
        “success” : false,
        “message” : “internal server error”
    }

### Get User (POST /:id)

#### url : localhost:99/user/:id

**_Request (params) : (required) id_**

**_Response: JSON_**

    200:
        {
            "success" : true,
            "data" :[
                    {
                        “id”: 1,
                        “nama”: “Fachry”,
                        “username”: “Croazt”,
                        “email”: “ayaiayai@gmail.com”,
                        “phone”: “085340907028”,
                        “balance”: “18399231978172391”,
                    }
                ]
        }

    404:
        {
            “success”   : false,
            “message”   : “User not found”
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

### Delete User (POST /:id/delete)

#### url : localhost:99/user/:id

**_Request (params) : (required) id_**

**_Response: JSON_**

    200:
        {
            "success" : true,
            "Message" : "Delete users success"
        }

    403:
        {
            “success”   : false,
            “message”   : “You have no right to do that”
        }

    404:
        {
            “success”   : false,
            “message”   : “User not found”
        }


    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }



## Admin (/Admin)

### Register Admin (POST /registerAdmin)

#### url : localhost:99/Admin/registerAdmin

**_Request (body): JSON_**

    {
        “name”      : “Muhammad Fachry Noorchoolish Arif”,
        “email”     : “kuykulinerin@gmail.com”,
        “username”  : “Croazt”,
        “Phone”     : “085340907028”,
        “password”  : “Yoimen99”
    }

**_Response: JSON_**

    200:
        {
            “success”   : true,
            “message”   : “registesuccess”
        }

    409:
        {
            “success”   : false,
            “message”   : “Email already registered”
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

## Place (/place)

## Create Place

**_Request (header): (required) Authorization: Bearer <JWT_TOKEN>_**

## Menu (/place)

### Create Menu (POST /:id_place/createmenu)

#### url : localhost:99/place/:id_place/createmenu

**_Request (params) : (required) id_place => id_places_**

**_Request (body): JSON_**

    {
        “nama” : “Makanan Enak Yuhuu”,
        “harga”   :  100000
    }

**_Response: JSON_**

    200:
        {
            "success" : true,
            "message" : "Register success"
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

### Update Menu (POST /:id_place/menu/:id/update)

#### url : localhost:99/place/:id_place/menu/:id/update

**_Request (body): JSON_**

    {
        “nama” : “Makanan Enak Yuhuu”,
        “harga”   :  100000
    }

**_Response: JSON_**

    200:
        {
            "success" : true,
            "message" : "Update success"
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

### Get All Menu Menu (POST /:id_place/menu/)

#### url : localhost:99/place/:id_place/menu/

**_Response: JSON_**

    200:
        {
            "success" : true,
            "data" :[
                    {
                        “id”: 1,
                        “nama”: “Makanan Enak Yuhuu”,
                        “harga”: 100000
                    },
                    {
                        “id”: 2,
                        “nama”: “Makanan Enak Yuhuu”,
                        “harga”: 100000
                    }
                ]
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }
