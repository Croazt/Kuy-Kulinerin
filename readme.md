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

    200 :
        {
            “success” : true,
            “token” : “12c312c039n089qc0sa”,
            “message” : “YOU LOGIN AS USER”

        }

    or  
    200 :
        {
            “success” : true,
            “token” : “12c312c039n089qc0sa”,
            “message” : “YOU LOGIN AS ADMIN”

        }
    
    or
    200 :
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

**_Request (header): (required) authorization: Bearer <JWT_TOKEN>_**

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

**_Request (header): (required) authorization: Bearer <JWT_TOKEN>_**

#### url : localhost:99/user/:id/update

**_Request (params) : (required) id_**

**_Request (body): JSON_**

    {
        “password”     : “ApaAjaBoleh”,
        “newPassword”  : “Bolehlah”,
    }

**_Response: JSON_**

    200:
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

**_Request (header): (required) authorization: Bearer <JWT_TOKEN>_**

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

**_Request (header): (required) authorization: Bearer <ADMIN_TOKEN>_**

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


### Delete Users By admin (POST /:id/delete)

**_Request (header): (required) authorization: Bearer <ADMIN_TOKEN>_**

#### url : localhost:99/user/:id

**_Request (params) : (required) id_**

**_Request (body): JSON_**

    {
        “email”     : “kuykulinerin@gmail.com”,
        “Phone”     : “085340907028”,
    }

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


## Place (/place)

## Search Place (POST /searchplace)

#### url : localhost:99/place/searchplace

**_Request (body): JSON_**

    {
        “input” : “rating”,
        “order” : “ASC”,
        “keyword” : “makan”,
        “coworking” : 1,
        “restaurant” : 1,
        “cafe” : 1
    }

**_Response: JSON_**

    200:
        {
            "success" : true,
            "data": [
                    {
                        "id": 1,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 3.5
                    }
                    {
                        "id": 2,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 4.5
                    }
                    {
                        "id": 3,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 5
                    }
            ]
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

## Get Place for home (GET /)

#### url : localhost:99/place

**_Response: JSON_**

    200:
        {
            "success" : true,
            "data": [
                    {
                        "id": 1,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 3.5
                    }
                    {
                        "id": 2,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 4.5
                    }
                    {
                        "id": 3,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 5
                    }
                ]
                "data2": [
                    {
                        "id": 3,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 2.5
                    }
                    {
                        "id": 10,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 4.5
                    }
                    {
                        "id": 1,
                        "location": "makanan enak",
                        "lowprice": 100000,
                        "highprice": 50000,
                        "opentime": "06:00:00",
                        "closetime": "24:00:00",
                        "image": "PlaceImage-CA9vKnVP.png",
                        "rating": 5
                    }
            ]
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

## Create Place (POST /createplace)

**_Request (header): (required) authorization: Bearer <ADMIN_TOKEN>_**

#### url : localhost:99/place/createplace

**_Request (body): MULTIPART_**
    
    myFile = images.png
    
    {
        “nama” : “Bakso Damas”,
        “rating” : 4.5,
        “coworking” : 1,
        “restaurant” : 1,
        “cafe” : 1
        “googlemap” : “https://www.google.com/maps/place/Bakso+Damas/@-7.952639,112.6079458,15z/data=!4m5!3m4!1s0x2dd629e12fb08173:0x40ea6973b3979085!8m2!3d-7.9384615!4d112.625294”,
        “location” : “Jl. Soekarno - Hatta No.75-74, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142”,
        “opentime”: “”06:00:00“”,
        “closetime”: “”24:00:00“”,
        “description”: “tempat ini mantap loh datanglah selagi sempat”,

    }

**_Response: JSON_**

    200:
        {
            "success" : "true",
                    "message" : "berhasil upload",
                    status: "File Uploaded Successfully", 
                    filename: "images.png" 
        }
    
    or
    200:
        {
            "success" : "true",
                    "message" : "berhasil upload",
                    status: "File Upload Failed ", 
                    filename: "images.png" 
        }
    403:
        {
            “success”   : false,
            “message”   : “YOU CANNOT ADD MORE PLACE ANYMORE”
        }

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }


### Delete Place By admin (DELETE /deleteplace/:id)

**_Request (header): (required) authorization: Bearer <ADMIN_TOKEN>_**

#### url : localhost:99/place/deleteplace/:id

**_Request (params) : (required) id_**

**_Response: JSON_**

    200:
        {
            "success" : true,
            "Message" : "Place with id = "+ id +" has been deleted"
        }

    403:
        {
            “success”   : false,
            “message”   : "You are not place owner"
        }

    404:
        {
            “success”   : false,
            “message”   : “Place not found”
        }


    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }


### Get Place By id (GET /:id)

#### url : localhost:99/place/:id

**_Request (params) : (required) id_**

**_Request (body): JSON_**

    {
        “input” : “rating”,
        “order” : “ASC”,
        “keyword” : “makan”,
        “coworking” : 1,
        “restaurant” : 1,
        “cafe” : 1
    }


**_Response: JSON_**

    200:
        {
            "success" : true,
            "data": [
                    “nama” : “Bakso Damas”,
                    “rating” : 4.5,
                    “coworking” : 1,
                    “restaurant” : 1,
                    “cafe” : 1
                    “googlemap” : “https://www.google.com/maps/place/Bakso+Damas/@-7.952639,112.6079458,15z/data=!4m5!3m4!1s0x2dd629e12fb08173:0x40ea6973b3979085!8m2!3d-7.9384615!4d112.625294”,
                    “location” : “Jl. Soekarno - Hatta No.75-74, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142”,
                    “opentime”: “”06:00:00“”,
                    “closetime”: “”24:00:00“”,
                    “description”: “tempat ini mantap loh datanglah selagi sempat”,
                }
        }

    404:
        {
            “success”   : false,
            “message”   : “Place not found”
        }


    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }


### Rate Place By id (POST /ratePlace/:id)

**_Request (header): (required) authorization: Bearer <JWT_TOKEN>_**

#### url : localhost:99/place/ratePlace/:id

**_Request (params) : (required) id => id_places _**

**_Request (body): JSON_**

    {
        “rating” : 4.5,
    }


**_Response: JSON_**

    200:
        {
            "success" : true,
            "message" : `rating on place with id 1 has updated to 4.5`
        } 

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }

### Comment Place By id (POST /ratePlace/:id)

**_Request (header): (required) authorization: Bearer <JWT_TOKEN>_**

#### url : localhost:99/place/ratePlace/:id

**_Request (params) : (required) id => id_places _**

**_Request (body): JSON_**

    {
        “comment” : “ini adalah koment terbaik”,
    }


**_Response: JSON_**

    200:
        {
            "success" : true,
            "message" : "You have posted a comment on place with id 1"
            
        } 

    500:
        {
            “success”   : false,
            “message”   : “internal server error”
        }
        


## Menu (/place)

### Create Menu (POST /:id_place/createmenu)

#### url : localhost:99/place/:id_place/createmenu

#### url : localhost:99/place/:id_place/createmenu

**_Request (header): (required) authorization: Bearer <ADMIN_TOKEN>_**

**_Request (params) : (required) id_place => place_id_**

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
