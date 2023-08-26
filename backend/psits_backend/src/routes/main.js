const express = require('express');
const router = express.Router();

// main Endpoint
router.get('/', (req, res) => {
    res.send(information)
})

module.exports = router;

const information = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PSITS UC MAIN - API</title>
    <style>
        body{
            margin: 0;
            background-color: rgb(243, 243, 243);
            color: black;
            font-size: 18px;
        }
        .banner{
            position: relative;
            width: 100%;
            height: 120px;
            background-color: #074873;
            display: flex;
        }

        .banner .icons{
            position: relative;
            height: 100%;
            width: 150px;
            padding-left: 50px;
        }
        .banner .icons img{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
        }

        .banner .title{
            position: relative;
            height: 50px;
            width: 400px;
            color: white;
            font-weight: 700;
            font-size: 18px;
            font-family: sans-serif;
            padding-left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        .center-y{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        .banner .title h3{
            margin: 0;
        }

        .showMobile{
            display: none;
        }

        .center{
            text-align: center;
        }
        section{
            position: relative;
            width: 90%;
            left: 50%;
            transform: translateX(-50%);
            border: 1px dotted grey;
            padding: 20px;
            overflow: hidden;
        }

        section h2{
            position: relative;
            margin: 0;
            width: fit-content;
            margin-top: 10px;
        }

        section span,
        section code{
            position: relative;
            text-align: justify;
            white-space: pre-wrap;
            
        }

        section .code{
            background-color: rgb(37, 37, 37);
            color: white;
        }

        section a,b{
            font-weight: 900;
            color: #074873;
        }

        section b{
            color: #1d8b38;
        }

        .orange{
            color: #a8580c;
        }
        code {
            font-family: monospace;
            min-width: 1500px;
            font-size: 15px;
        }

        .purple{
            color: #cf28e6;
        }
        .red{
            color: rgb(255, 77, 77);
        }
        .link{
            color: rgb(0, 155, 155);
        }
        .gray_comment{
            color: gray;
        }

        .bg_blue_2{
            background-color: rgb(7, 74, 119, 0.2);
        }
        @media screen and (min-width: 0px) and (max-width: 550px) {
            .hideMobile{
                display: none;
            }
            .showMobile{
                display: block;
            }

            .banner .title{
                padding-left: 0px;
            }
        }
    </style>
</head>
<body>
    <div class="banner">
        <div class="icons">
            <img src="https://github.com/jaymar921/PSITSWebApp/raw/master/PSITSweb/static/images/PSITS_LOGO.png"/>
            <img class="hideMobile" src="https://github.com/jaymar921/PSITSWebApp/raw/master/PSITSweb/static/images/uc.png"/>
            <img class="hideMobile" src="https://github.com/jaymar921/PSITSWebApp/raw/master/PSITSweb/static/images/CCS_LOGO.png"/>
        </div>
        <div class="title">
            <h3 class="hideMobile">Philippine Society of Information Technology Students</h3>
            <h3 class="showMobile center-y">PSITS - API</h3>
        </div>
    </div>
    
    <h1 class="center">Application Programming Interface</h1>
    <p class="center">Documented by: <a target="_blank" href="https://jayharronabejar.info">Jayharron Mar Canillo Abejar</a></p>
    <section class="bg_blue_2">
        <h2>What is an API?</h2>
        <span>
    First of all, an API is a set of protocols and instructions that will determine how two software components will communicate with each other. In a web application, we have two sides, the <a>frontend</a> and the <a>backend</a>, the frontend contains all the UI components for the clients to view while the backend will do the logical and database operations. This <a href="/">page</a> is the API and will connect both <a>frontend</a> and <a>backend</a> to complete it's purpose.
        </span>
        <h2>Why was this created?</h2>
        <span>
    This project was built and owned by <b><a class="orange" target="_blank" href="https://jayharronabejar.info">Jayharron Mar Canillo Abejar</a></b> a BSIT Batch of 2023 Graduate of University of Cebu Main Campus for the <a>Philippine Society of Information Technology Student - UC Main</a> organization to use. This project will be the successor of the old <a target="_blank" href="https://github.com/jaymar921/PSITSWebApp">PSITS-UCMAIN-WEBAPP</a> that was also built by the owner of this project.

    Although an older version of this system has already been existed since 2022, this project brings huge improvements that includes optimization and security from which the predecessor lacks.
        </span>
        <h2>Is this open source?</h2>
        <span>
    Yes! This project is open for collaboration but only limits to the Students of <a>University of Cebu</a> and <a>Alumni/Graduates</a>. If you're interested to join and collaborate with the project, send your <a>CV</a> at the <a class="orange" target="_blank" href="https://www.facebook.com/PSITS.UCmain">PSITS FB PAGE</a>.
        </span>
        <h2>What is this page for?</h2>
        <span>
    Since this page is not the actual <a>Front-End</a> side of the project which was hosted here <a>[coming soon]</a>. The main purpose of this page is to show the documentation of the app's API and allow <a>Code Maintainers/Collaborators</a> to have an idea about the proper implementation of the API.
        
    - 
    
    Without further ado, lets proceed to the documentation <b>:D</b>

    - <a href="#auth">Authentication/Authorization</a>
    - <a href="#users">Users</a>
    - <a href="#announcement">Announcements</a>
    - <a href="#events">School Events</a>
    - <a href="#merchandise">Merchandise</a>
    - <a href="#orders">Orders</a>

        </span>
    </section>
    <h1 id="auth" class="center">Authentication/Authorization</h1>
    <section class="bg_blue_2">
        <h2>Properly authenticate users</h2>
        <span>
    We live in a world where trust doesn't always exist, we cannot just trust someone to do transactions without an identification. In this <a>API</a> we assume that the <a>User</a> already had an identification existed in the database and all we need from that <a>User</a> is his/her <b>User_ID</b> and <b>Password</b> to prove their identity, as a return from the validation, we give the <a>User</a> an <a>AuthToken</a> which is an access token that will be used by the Users to interact with the software features that they are authorized to, the <a>AuthToken</a> will be valid for <a class="orange">2 hours</a>. To know if the <a>User</a> really has the real <a>AuthToken</a> we can also validate it if it was true.
        </span>
        <h2>Generate Authentication Token</h2>
        <div class="code">
            <code >
    // Generating AuthToken from the API
    GET https://api_url/api/auth
    [HEADERS]
    user_id:  00000001
    password: p@5zw0rD
    // Optional Header [Alternative for UserID]
    rfid: 00000001

    [RESPONSE]
    // On Success Authentication
    {
        "AuthToken": {
            "AuthToken": "fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f",
            "ExpirationDate": 1691855476095,
            "issuer": 00000001
        },
        "StatusCode": 200,
        "message": "Authorized"
    }

    // On Failed Authentication [Invalid Credentials]
    {
        "message": "Unauthorized",
        "StatusCode": 401
    }
            </code>
        </div>
        <h2>Validate Authentication Token</h2>
        <span>
    To know if the <a>AuthToken</a> that the authenticated user is really valid, you can call the validate api route. The validation route also provides if the <a>AuthToken</a> to validate has expired or not, it will also show the time remaining on a specific <a>AuthToken</a>.
        </span>
        <div class="code">
            <code>
    // Validating Authentication Token
    GET https://api_url/api/auth/validate
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f

    [RESPONSE] 
    // On Success Validation
    {
        "IsExpired": false,
        "ExpireTime": "120 min",
        "message": "AuthToken was verified",
        "StatusCode": 200
    }

    // On Failed Validation
    {
        "message": "AuthToken provided does not exists!",
        "StatusCode": 403
    }
            </code>
        </div>
    </section>
    <h1 id="users" class="center">Users</h1>
    <section class="bg_blue_2">
        <h2>Properly register users</h2>
        <span>
    Our <a>Users</a> are basically the <a>Students</a> of University of Cebu Main Campus, let's just call them <a>Users</a> since they will be interacting with the application's features. For registering new <a>User</a> accounts, you must have a valid <a class="red">API_KEY</a> to call the API <a class="orange">POST</a> Request, this avoids random data of being fed into the server's database. The following code below will guide you on how to properly create, read, update and delete <a>User</a>\s information.
        </span>
        <div class="code">
            <code>
    // Register a new User Account, you must have a valid API_KEY to call the request
    POST https://api_url/api/user
    [HEADERS]
    API_KEY: API_KEY_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    Content-Type: application/json

    [BODY]
    {
        // the "user_id" cannot be changed once registered
        "user_id": 00000001,
        "rfid": "",
        "firstname": "Jayharron Mar",
        "lastname": "Abejar",
        "email": "jay@testemail.com",
        // note that the password will be hashed in the database using SHA512
        "password": "12345678",
        "course": "BSIT",
        "year": 4,
        "graduated": true,
        "profile_img_link": "http://avatars.githubusercontent.com/u/72720429?s=256&v=4"
    }

    [RESPONSE]
    // On Success Registration
    {
        newUser: {
            "user_id": 00000001,
            "rfid": "",
            "firstname": "Jayharron Mar",
            "lastname": "Abejar",
            "birthdate": "2023-08-09T00:00:00.000Z",
            "email": "jay@testemail.com",
            "course": "BSIT",
            "year": 4,
            "graduated": true,
            "profile_img_link": "http://avatars.githubusercontent.com/u/72720429?s=256&v=4"
        },
        "message": "User account created",
        "StatusCode": 201
    }
            </code>
        </div>
        <h2>Retrieving User information</h2>
        <span>
    There are 2 ways of getting the <a>User</a> information. First, the user must be the issuer of the <a>AuthToken</a> to retrieve his/her information at <a class="orange">GET/:user_id</a>, this only returns 1 user information of their own, they are forbidden to view other User's account. Second, if the <a>AuthToken</a> is associated with a user that has an Admin privilege, they can retrieve all user's information in the database using the <a class="orange">GET/</a> path but not <a class="orange">GET/:user_id</a>.
        </span>
        <div class="code">
            <code>
    // Retrieving a single user account, the AuthToken must be from the requestor
    GET https://api_url/api/user/00000001
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 

    [RESPONSE]
    // On Success
    {
        "UserData": {
            "user_id": 00000001,
            "rfid": "",
            "firstname": "Jayharron Mar",
            "lastname": "Abejar",
            "birthdate": "2023-08-09T00:00:00.000Z",
            "email": "jay@testemail.com",
            "profile_img_link": "https://avatars.githubusercontent.com/u/72720429?s=256&v=4",
            "course": "BSIT",
            "year": 4,
            "graduated": true
        },
        "message": "Retrieved user information",
        "StatusCode": 200
    }
            </code>
        </div>
        <span>
    Retrieving multiple account information
        </span>
        <div class="code">
            <code>
    // Retrieving a multiple user account, the AuthToken must be issued by user with admin privilege
    GET https://api_url/api/user
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 

    [RESPONSE]
    // On Success
    {
        "Users": [
            {
                "user_id": 00000001,
                "rfid": "",
                "firstname": "Jayharron Mar",
                "lastname": "Abejar",
                "birthdate": "2023-08-09T00:00:00.000Z",
                "email": "jay@testemail.com",
                "profile_img_link": "https://avatars.githubusercontent.com/u/72720429?s=256&v=4",
                "course": "BSIT",
                "year": 4,
                "graduated": true
            }
        ],
        "Size": 1,
        "message": "Retrieved users",
        "StatusCode": 200
    }
            </code>
        </div>
        <h2>Updating User information</h2>
        <span>
    When Updating a <a>User</a> information, the <a>AuthToken</a> must belong to a user who wanted to update their account or it must be an admin, otherwise, they will be forbidden to do the <a class="orange">PATCH/:user_id</a> request.
        </span>
        <div class="code">
            <code>
    PATCH https://api_url/api/user/00000001
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json

    [BODY]
    // It is not necessary to update all the fields
    {
        // the "user_id" cannot be changed
        "firstname": "Jayharron Mar",
        "lastname": "Abejar",
        "birthdate": "2000-09-21T00:00:00.000Z",
        "email": "jay@testemail.com",
        // note that the password will be hashed in the database using SHA512
        "password": "12345678",
        "course": "BSIT",
        "year": 4,
        "graduated": true
    }
            </code>
        </div>
        <h2>Deleting a user information</h2>
        <span>
    Only a <a>User</a> that are the issuer of the <a>AuthToken</a> or has an admin privilege to do the <a class="orange">DELETE/:user_id</a> request.
        </span>
        <div class="code">
            <code>
    DELETE https://api_url/api/user/00000001
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
            </code>
        </div>
    </section>
    <h1 id="announcement" class="center">Announcements</h1>
    <section class="bg_blue_2">
        <h2>Le Portalz Announcementz </h2>
        <span>
    Since this is a student portal, it would not be completed without allowing the <a>PSITS Officers</a> to deliver some announcements to the <a>Students</a>. The code below will show the routes and steps on how to properly do the CRUD operation of the announcements. <a class="red">Note: </a> Only <a>AuthToken</a> that are issued by a <a>User</a> that has an admin privilege must be allowed to post or modify the announcement data, otherwise, they can only view the announcement.
        </span>
        <div class="code">
            <code>
    // Posting a new announcement
    POST https://api_url/api/announcement
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json 

    [BODY] 
    {
        "title": "Hello World",
        "content": "First announcement ever! more progress",
        "photo_img_links": [
            "http://link_to_some_image.com/picture1"
        ]
    }    
            </code>
        </div>
        <h2>Viewing announcements</h2>
        <div class="code">
            <code>
    GET https://api_url/api/announcement

    // returns a list of announcement data
    // The front-end dev must do pagination with the data provided
    [RESPONSE] 
    {
        "Announcements": [
          {
            "_id": "64d61ffca72f4f89f71850ce",
            "title": "Hello World",
            "author": {
              "user_id": 00000001,
              "rfid": "",
              "firstname": "Jayharron Mar",
              "lastname": "Abejar",
              "birthdate": "2023-08-09T00:00:00.000Z",
              "email": "jay@testemail.com",
              "profile_img_link": "https://avatars.githubusercontent.com/u/72720429?s=256&v=4",
              "course": "BSIT",
              "year": 4,
              "graduated": true
            },
            "content": "First announcement ever! more progress",
            "photo_img_links": [
              "http://link_to_some_image.com/picture1"
            ]
          }
        ],
        "Size": 1,
        "message": "Retrieved announcements info",
        "StatusCode": 200
    }
            </code>
        </div>
        <h2>Updating Announcement</h2>
        <div class="code">
            <code>
    // you must get the announcement id first before updating
    PATCH https://api_url/api/announcement/64d4bf4b5607c02fbf8514dc
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json 

    [BODY] 
    // all fields are not necessary to be updated
    {
        "title": "Hello World [updated]",
        "content": "First announcement ever! more progress [update!!!]",
        "photo_img_links": [
            "http://link_to_some_image.com/picture1",
            "http://link_to_some_image.com/picture2"
        ]
    } 
            </code>
        </div>
        <h2>Deleting an announcement</h2>
        <div class="code">
            <code>
    // you must get the announcement id first before deleting
    DELETE https://api_url/api/announcement/64d4bf4b5607c02fbf8514dc
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f       
            </code>
        </div>
    </section class="bg_blue_2">
    <h1 id="events" class="center">School Events</h1>
    <section class="bg_blue_2">
        <h2>Just like announcements but with a specific purpose</h2>
        <span>
    Aside from posting announcements, <a>PSITS Officers</a> can separate additional information about an upcoming school events that will be held in the future. Just like announcements, the school events will also have a specific UI in the front-end that will only list the School Events announced by the <a>PSITS Officers</a>. For posting, modifying and deleting of school events, the <a>AuthToken</a> must be issued by a <a>User</a> with an admin privilege.
        </span>
        <div class="code">
            <code>
    // Posting a School Event
    POST https://api_url/api/event 
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "title": "First Day Extravaganza",
        "eventDate": "2023-08-22T00:00:00.000Z",
        "content": "Hello everyone! welcome to S.Y. 2023-2024",
        "photo_img_links": [
            "https://th.bing.com/th/id/OIP.qw2DwMX4cyYQAZNzaQmGlQHaIW?pid=ImgDet&rs=1"
        ]
    }            
            </code>
        </div>
        <h2>Viewing School Events</h2>
        <div class="code">
            <code>
    GET https://api_url/api/event 
    
    [RESPONSE] 
    {
        "events": [
            {
                "_id": "64d4d36ad71b0cf0cfdc7a5f",
                "title": "First Day Extravaganza",
                "creationDate": "2023-08-10T12:06:02.312Z",
                "eventDate": "2023-08-22T00:00:00.000Z",
                "content": "Hello everyone! welcome to S.Y. 2023-2024",
                "photo_img_links": [
                    "https://th.bing.com/th/id/OIP.qw2DwMX4cyYQAZNzaQmGlQHaIW?pid=ImgDet&rs=1"
                ],
                "__v": 0
            }
        ],
        "message": "Retrieved School Events",
        "StatusCode": 200
    }
            </code>
        </div>
        <h2>Updating School Events</h2>
        <div class="code">
            <code>
    // you must first know the event id before updating
    PATCH  https://api_url/api/event/64d4d36ad71b0cf0cfdc7a5f
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "title": "First Day Extravaganza",
        "content": "Hello everyone! welcome to S.Y. 2023-2024! This is new update!"
    }
            </code>
        </div>
        <h2>Deleting Event</h2>
        <div class="code">
            <code>
    // you must first know the event id before deleting
    DELETE  https://api_url/api/event/64d4d36ad71b0cf0cfdc7a5f
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
            </code>
        </div>
    </section>
    <h1 id="merchandise" class="center">Merchandise</h1>
    <section class="bg_blue_2">
        <h2>Merch for sale!</h2>
        <span>
    One of the most important feature of this application is selling <a>Merchandise</a>, especially during Intramurals and ICT Congress, <a>Users</a> will buy T-Shirt merchandise. On the old version, we used to have <a>PROMOCODES</a> but we removed it here. Only <a>AuthToken</a> that are issued by <a>Users</a> with admin privilege are allowed to post/delete/modify the merchandise, otherwise, they can only view the merchandise information.
        </span>
        <div class="code">
            <code>
    POST http://localhost:3000/api/merch
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json

    [BODY]
    {
        "title": "PSITS Sticker Merch",
        "information": "We the PSITS Org are selling \\nSticker Merch!\\n Grab yours now!\\n\\nP25 for 3pcs",
        "price": 25,
        "discount": 0,
        "stock": 10,
        "photo_img_links": [
            "https://th.bing.com/th/id/OIP.huUeVndZ5piZnULdatkF3AHaFj?pid=ImgDet&rs=1",
            "https://th.bing.com/th/id/OIP.kLgo9dgdv8FR8NOYpPq8nwHaF4?pid=ImgDet&w=698&h=555&rs=1"
        ],
        "size": "N/A",
        "color": "N/A",
        "styles": [
            "java",
            "c#",
            "c++",
            "javascript",
            "python"
        ],
        "showPublic": true
    }
            </code>
        </div>
        <h2>Viewing merchandise</h2>
        <span>
    Aside from retrieving merch information, the <a>Reviews</a> are now included in the response payload. It will be up to the front-end developer if they want to show the Merchandise reviews at the <a>Front-end</a>.
        </span>
        <div class="code">
            <code>
    GET http://localhost:3000/api/merch

    [RESPONSE]
    {
        "merchandiseData": [
            // { merch , reviews }
            {
                "merch": {
                    "_id": "64d4e0e5aa0832371249a8da",
                    "title": "PSITS Sticker Merch",
                    "information": "We the PSITS Org are selling \\nSticker Merch!\\n Grab yours now!\\n\\nP25 for 3pcs",
                    "price": 25,
                    "discount": 0,
                    "stock": 10,
                    "photo_img_links": [
                        "https://th.bing.com/th/id/OIP.huUeVndZ5piZnULdatkF3AHaFj?pid=ImgDet&rs=1",
                        "https://th.bing.com/th/id/OIP.kLgo9dgdv8FR8NOYpPq8nwHaF4?pid=ImgDet&w=698&h=555&rs=1"
                    ],
                    "size": "N/A",
                    "color": "N/A",
                    "styles": [
                        "java",
                        "c#",
                        "c++",
                        "javascript",
                        "python"
                    ],
                    "rating": 5,
                    "__v": 0,
                    "showPublic": true
                },
                // for each merchandise data retrieve, an array of reviews are also included
                // it is up to the developer if they want to show it in the UI
                "reviews": [
                    {
                        "review": "Verry Good!",
                        "rating": 5,
                        "user": {
                        "firstname": "Jayharron Mar",
                        "lastname": "Abejar",
                        "profile_img_link": "https://avatars.githubusercontent.com/u/72720429?s=256&v=4"
                        }
                    }
                ]
            }
        ],
        "Size": 1,
        "message": "Retrieved Merchandise info",
        "StatusCode": 200
    }      
            </code>
        </div>
        <h2>Updating Merchandise information</h2>
        <div class="code">
            <code>
    PATCH http://localhost:3000/api/merch/64d4e0e5aa0832371249a8da
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json

    [BODY]
    // It is okay not to include all the fields
    {
        "title": "PSITS Sticker Merch",
        "information": "We the PSITS Org are selling \nSticker Merch!\n Grab yours now!\n\nP25 for 3pcs",
        "price": 25,
        "discount": 0,
        "stock": 10,
        "photo_img_links": [
            "https://th.bing.com/th/id/OIP.huUeVndZ5piZnULdatkF3AHaFj?pid=ImgDet&rs=1",
            "https://th.bing.com/th/id/OIP.kLgo9dgdv8FR8NOYpPq8nwHaF4?pid=ImgDet&w=698&h=555&rs=1"
        ],
        "size": "N/A",
        "color": "N/A",
        "styles": [
            "java",
            "c#",
            "c++",
            "javascript",
            "python"
        ],
        "showPublic": true
    }
            </code>
        </div>
        <h2>Deleting Merchandise Information</h2>
        <span>
    Deleting a merchandise is not recommended since there is a <a class="red">showPublic</a> attribute in the Merchandise object which hides/show the Merchandise in the <a>Front-End</a> UI. But if the admin really wants to delete the merchandise info then they can.
        </span>
        <div class="code">
            <code>
    DELETE http://localhost:3000/api/merch/64d4e0e5aa0832371249a8da
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
            </code>
        </div>
    </section>
    <h1 id="orders" class="center">User Orders</h1>
    <section class="bg_blue_2">
        <h2>Ordering from Merchandise</h2>
        <span>
    Ordering merchandise is one feature that is very important in the application and it should be treated seriously. When a <a>User</a> orders a merchandise, they should have an <a>AuthToken</a> issued by them in order to track who's the customer of a particular order. Before placing an order, as a developer, you should know what the <a>User</a> are buying since we will need the <a class="orange">MerchandiseID</a>.
        </span>
        <h2>Placing an order</h2>
        <div class="code">
            <code>
    POST http://localhost:3000/api/order
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json

    [BODY]
    // all fields are required and should not be mistaken
    {
        // "student_id" is no longer needed since it will be captured from the AuthToken issuer
        "merch_id": "64d4e0e5aa0832371249a8da",
        "information": "I want to order a sticker merch, java sticker to be specific",
        "size": "N/A",
        "color": "N/A",
        "style": "java"
        "status": "ORDERED",
        "quantity": 1
    }

    [RESPONSE] 
    // On Successful Place Order
    {
        "placedOrder": {
          "student_id": "64d61f96a72f4f89f71850be",
          "merch_id": "64d4e0e5aa0832371249a8da",
          // reference can be used by admins to update order status
          "reference": "PSITS_73488738Y5016NVX",
          "information": "I want to order a sticker merch, java sticker to be specific",
          "size": "N/A",
          "color": "N/A",
          "style": "java",
          "status": "ORDERED",
          "review": "",
          "rating": 0,
          "quantity": 1,
          "_id": "64d88f274feb7fd24f8d9e06",
          "__v": 0
        },
        "message": "Order was placed successfully",
        "StatusCode": 200
    }
            </code>
        </div>
        <h2>Viewing a Specific Order</h2>
        <span>
    Viewing a specific order is only available to <a>Admins</a> and <a>Users</a> who did the transaction. <a class="red">Note: </a> the <a class="gray_comment">reference</a> can also be used to retrieve order information.
        </span>
        <div class="code">
            <code>
    // retrieving order information using reference
    GET http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
            </code>
            <code>
    // retrieving order information using order id
    GET http://localhost:3000/api/order/64d88f274feb7fd24f8d9e06
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 

    [RESPONSE] 
    {
        "order": {
            "_id": "64d88f274feb7fd24f8d9e06",
            "student_id": "64d61f96a72f4f89f71850be",
            "merch_id": "64d4e0e5aa0832371249a8da",
            "reference": "PSITS_73488738Y5016NVX",
            "information": "I want to order a sticker merch, java sticker to be specific",
            "size": "N/A",
            "color": "N/A",
            "style": "java",
            "status": "ORDERED",
            "review": "",
            "rating": 0,
            "quantity": 1,
            "__v": 0
        },
        "message": "Retrieved order successfuly",
        "StatusCode": 200
    }  
            </code>
        </div>
        <h2>Viewing all orders</h2>
        <div class="code">
            <code>
    // Only admins can do this
    GET http://localhost:3000/api/order
    [HEADERS]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    // The 'Option' header is optional
    // Option value can be the Reference, MerchID or UserID
    Option: 64d4e0e5aa0832371249a8da

    [RESPONSE]
    {
        "user_orders": [
            {
                "_id": "64d88f274feb7fd24f8d9e06",
                "student_id": "64d61f96a72f4f89f71850be",
                "merch_id": "64d4e0e5aa0832371249a8da",
                "reference": "PSITS_73488738Y5016NVX",
                "information": "I want to order a sticker merch, java sticker to be specific",
                "size": "N/A",
                "color": "N/A",
                "style": "java",
                "status": "ORDERED",
                "review": "",
                "rating": 0,
                "quantity": 1,
                "__v": 0
            }
        ],
        "Size": 1,
        "message": "Retrieved user orders",
        "StatusCode": 200
    }
            </code>
        </div>
        <h3>Updating Order</h3>
        <span>
    The customer[<a>User</a>] can change the order information such as information, size, quantity and color with ease. As for the <a>Status</a>, once <a class="red">ORDERED</a>, they can only update to <a class="red">CANCELLED</a> and it shouldn't be allowed to be <a class="red">ORDERED</a> again, they have to place a new order in that case. For <a class="red">CLAIMED</a> orders, the only available option is to review the product.

    Flow of updating order
    <a class="orange">Customer Side</a>
    • From <a class="red">ORDERED</a> to <a class="red">CANCELLED</a> -> if an order has been cancelled, depending on how many quantity the order is, it will be returned to the merchandise.stock.
    • From <a class="red">CLAIMED</a> to <a class="red">REVIEWED</a> -> updating to reviewed, the <a>rating</a> and <a>review</a> should be included at the request payload.

    <a class="orange">Admin Side</a>
    • From <a class="red">ORDERED</a> to <a class="red">PAID</a> -> once the orders are paid, the admin can change the status to paid, and the <a>User</a> will wait for when to claim the product.
    • From <a class="red">PAID</a> to <a class="red">CLAIMED</a> -> once the product has arrived and the <a>User</a> has claimed it, the admins can change the status to <a class="red">CLAIMED</a>
        </span>
        <div class="code">
            <code>
    // cancelling an order
    PATCH http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    // <a>AuthToken</a> must be issued by the customer[<a>User</a>]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "status": "CANCELLED"
    }
            </code>
        </div>
        <br />
        <div class="code">
            <code>
    // reviewing an order
    PATCH http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    // <a>AuthToken</a> must be issued by the customer[<a>User</a>]
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "status": "REVIEWED",
        "review": "Verry Good!",
        "rating": 5
    }
            </code>
        </div>
        <br />
        <div class="code">
            <code>
    // updating to paid from ordered
    PATCH http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    // <a>AuthToken</a> must be issued by <a class="red">Admins</a>
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "status": "PAID"
    }
            </code>
        </div>
        <br />
        <div class="code">
            <code>
    // updating to claimed from paid
    PATCH http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    // <a>AuthToken</a> must be issued by <a class="red">Admins</a>
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "status": "CLAIMED"
    }
            </code>
        </div>
        <br />
        <div class="code">
            <code>
    // just updating order information
    PATCH http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    // <a>AuthToken</a> must be issued by <a class="red">Admins</a>
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
    Content-Type: application/json
    
    [BODY]
    {
        "information": "I just change my order to C#",
        "style": "C#"
    }
            </code>
        </div>
        <h2>Deleting an Order</h2>
        <span>
    Although this is not recommended since an order may contain reviews that might be useful to the merchandise. It's really up to the <a class="red">Admins</a> if they want to pursue.
        </span>
        <div class="code">
            <code>
    // deleting an order
    DELETE http://localhost:3000/api/order/PSITS_73488738Y5016NVX
    [HEADERS]
    // <a>AuthToken</a> must be issued by <a class="red">Admins</a>
    AuthToken: fa1450c7-6145-49b2-a3fa-6a0d55bd3c7f 
            </code>
        </div>
    </section>
    <br />
    <br />
    <br />
    <br />
    <p class="center">... End of documentation ...</p>
    <p class="center">Last update: August 13 2023</p>
















    <script>
        (async() => {
            const codes = document.querySelectorAll('code');
            codes.forEach((code) => {
                const {innerHTML} = code;
                let updated = innerHTML.replace('GET', '<a class="purple">GET</a>');
                updated = updated.replace('POST', '<a class="purple">POST</a>');
                updated = updated.replace('PATCH', '<a class="purple">PATCH</a>');
                updated = updated.replace('DELETE', '<a class="purple">DELETE</a>');
                updated = updated.replace('[HEADERS]', '<a class="red">[HEADERS]</a>');
                updated = updated.replace('[BODY]', '<a class="red">[BODY]</a>');
                updated = updated.replace('[RESPONSE]', '<b>[RESPONSE]</b>');
                let lines = updated.split(["\\n"]);
                lines.forEach(line => {
                    if(line.includes("//") && (!line.includes("://")))
                        updated = updated.replace(line, \`<a class='gray_comment'>\${line}</a>\`);
                    
                    let splittedLines = line.split([" "]);
                    splittedLines.forEach(splitLine => {
                        //let newSplitLine = splitLine.replace("https://api_url", \`\${window.location.protocol}//\${window.location.host}\`);
                        if(splitLine.includes("http://") || splitLine.includes("https://")){
                            updated = updated.replace(splitLine, \`<a class='link'>\${splitLine}</a>\`);
                            updated = updated.replace("https://api_url", \`\${window.location.protocol}//\${window.location.host}\`);
                            updated = updated.replace("http://localhost:3000", \`\${window.location.protocol}//\${window.location.host}\`);
                        }
                    })
                })
                code.innerHTML = updated
            })
        })();
    </script>
</body>
</html>
`
