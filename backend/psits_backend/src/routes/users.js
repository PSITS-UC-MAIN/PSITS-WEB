const express = require('express');
const router = express.Router();

const { SHA512, EncapulateUser } = require('../utils/ServerUtils');
const Users = require('../models/UserModel');
const { GetAuthToken } = require('../middlewares/authmiddlewares');

// create new user
router.post('/', async (req, res)=> {
    // build the user object
    const user = new Users({
        user_id: req.body.user_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        email: req.body.email,
        password: await SHA512(req.body.password),
        profile_img_link: req.body.profile_img_link,
        course: req.body.course,
        year: req.body.year,
        graduated: req.body.graduated,
    })

    try{
        // check if data already exists in the database
        const existingEntry = await Users.findOne({email: user.email, user_id: user.user_id});
        
        if(existingEntry)
            return res.status(409).json({message: `Failed to created account, data already exists in the database`, StatusCode : 409})

        // save the user information
        const newUser = await user.save();
        res.status(201).json({newUser, message: "User account created", StatusCode: 201});
    }catch(error){
        res.status(400).json({message: "Error on saving user info : "+error.message, StatusCode: 400})
    }
});

// get one user info
router.get('/:user_id', GetAuthToken, async (req, res) => {
    let user_id = req.params.user_id??0;
    user_id = Number.parseInt(user_id);

    if(user_id !== res.issuer){
        return res.status(403).json({message: "User ID does not match with the AuthToken issuer", StatusCode: 403});
    }

    const user = await Users.findOne({user_id: user_id});
    
    if(!user)
        return res.status(404).json({message: "Requested user information was not found!", StatusCode: 404});

    res.status(200).json({UserData:EncapulateUser(user), message: "Retrieved user information", StatusCode: 200});
});


// get all users
router.get('/', GetAuthToken, async (req, res) => {
    if(!res.isAdmin)
        return res.status(404).json({message: "AuthToken provided is not allowed", StatusCode: 404})

    const users = []
    
    const retrievedUsers = await Users.find();

    retrievedUsers.forEach(u => {
        users.push(EncapulateUser(u));
    })

    res.status(200).json({Users:users,Size: users.length, message: "Retrieved users", StatusCode: 200})
});

// path user data
router.patch('/:user_id', GetAuthToken, async (req, res) => {
    let user_id = req.params.user_id??0;
    user_id = Number.parseInt(user_id);

    

    const user = await Users.findOne({user_id: user_id});
    
    if(!user)
        return res.status(404).json({message: "Requested user information was not found!", StatusCode: 404});

    // update rfid
    if(req.body.rfid)
        user.rfid = req.body.rfid;
    // update firstname
    if(req.body.firstname)
        user.firstname = req.body.firstname;
    // update lastname
    if(req.body.lastname)
        user.lastname = req.body.lastname;
    // update birthdate
    if(req.body.birthdate)
        user.birthdate = req.body.birthdate;
    // update email and password, only when the AuthToken provided is the issuer
    if(user_id === res.issuer){
        if(req.body.email)
            user.email = req.body.email;
        if(req.body.password)
            user.password = await SHA512(req.body.password);
    }
    // update profile img
    if(req.body.profile_img_link)
        user.profile_img_link = req.body.profile_img_link;
    // update course
    if(req.body.course)
        user.course = req.body.course;
    // update year
    if(req.body.year)
        user.year = req.body.year;
    // update graduated
    if(req.body.graduated !== null)
        user.graduated = req.body.graduated;

    // update admin credentials, only if the AuthToken provided has admin rights
    if(res.isAdmin){
        if('isAdmin' in req.body)
            user.isAdmin = req.body.isAdmin;
    }

    // save
    try{
        const updatedUser = await user.save();
        res.status(200).json({updatedUser, message: "User info Updated", StatusCode: 200});
    }catch(error){
        res.status(400).json({message: "Failed to update user || error: "+error.message, StatusCode: 400});
    }
})

// Delete User Data
router.delete('/:user_id', GetAuthToken, async (req, res)=> {
    let user_id = req.params.user_id??0;
    user_id = Number.parseInt(user_id);

    if(user_id !== res.issuer || !res.isAdmin){
        return res.status(403).json({message: "User ID does not match with the AuthToken issuer", StatusCode: 403});
    }

    const user = await Users.findOne({user_id: user_id});
    
    if(!user)
        return res.status(404).json({message: "Requested user information was not found!", StatusCode: 404});

    // delete the user
    try{
        await user.deleteOne();
        res.status(200).json({message : "User Data was deleted", StatusCode: 200});
    }catch(error){
        res.status(500).json({message: "Failed to delete user data : "+error.message , StatusCode: 500})
    }
});


module.exports = router;