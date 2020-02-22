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
***Request (body): JSON***

    {
        “name”      : “Muhammad Fachry Noorchoolish Arif”,
        “email”     : “kuykulinerin@gmail.com”,
        “username”  : “Croazt”,
        “Phone”     : “085340907028”,
        “password”  : “Yoimen99”
    }

***Response: JSON***

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

### Login User (POST /login)
#### url : localhost:99/user/login
***Request (Body): JSON***

            
    {
        “email”     : “kuykulinerin@gmail.com”,
        “username”  : “Croazt”,
        "password”  : “Yoimen33”
    }

***Response: JSON***
    
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
    
    403:
    {
        “success” : false,
        “message” : “Wrong username or password”
    }
    
    409:     
    {
        “success”: false,
        “message”: “It seems u have not registered yet”
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
***Request (body): JSON***

    {
        “nama”     : “AYOLAH”,
        “username”  : “Bolehlah”,
        “email”     : “kuykulinerin@gmail.com”,
        “phone”  : “085340907028”,
    }
    
***Response: JSON***

    202:         
    {
        “success”: true,
        “message”: “Update success”
    }

    409:    
    {
        “success”: false,
        “message”: “Not valid email”
    }

    410:
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

***Response: JSON***

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
                    }
                ]
        }

    500:    
        {
            “success”   : false,
            “message”   : “internal server error”
        }

## Admin (/Admin)

### Register Admin (POST /registerAdmin)
#### url : localhost:99/Admin/registerAdmin
***Request (body): JSON***

    {
        “name”      : “Muhammad Fachry Noorchoolish Arif”,
        “email”     : “kuykulinerin@gmail.com”,
        “username”  : “Croazt”,
        “Phone”     : “085340907028”,
        “password”  : “Yoimen99”
    }

***Response: JSON***

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

***Request (header): (required) Authorization: Bearer <JWT_TOKEN>***

## Menu (/place)

### Create Menu (POST /:id_place/createmenu)
#### url : localhost:99/place/:id_place/createmenu

***Request (params) : (required) id_place => id_places***
***Request (body): JSON***

    {
        “nama” : “Makanan Enak Yuhuu”,
        “harga”   :  100000
    }

***Response: JSON***

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
***Request (body): JSON***

    {
        “nama” : “Makanan Enak Yuhuu”,
        “harga”   :  100000
    }

***Response: JSON***

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

***Response: JSON***

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

