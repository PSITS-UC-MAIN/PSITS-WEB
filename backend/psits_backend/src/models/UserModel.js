const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
    user_id:{
        type: Number,
        required: true,
    },
    rfid:{
        type: String,
        required: false,
        default: ""
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: false,
        default: new Date("2023-08-09")
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_img_link: {
        type: String,
        required: false,
        default: process.env.PROFILE_IMG_DEFAULT,
    },
    course:{
        type: String,
        required: false,
        default: 'BSIT'
    },
    year: {
        type: Number,
        required: false,
        default: 1
    },
    graduated: {
        type: Boolean,
        required: false,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = mongoose.model('UserModel', userModelSchema);