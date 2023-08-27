const mongoose = require('mongoose');

const OfficeLogModel = new mongoose.Schema({
    user:{
        type: Number,
        required: true
    },
    loginTime:{
        type: Date,
        required: false,
        default: new Date()
    },
    logoutTime:{
        type: Date,
        required: false,
        default: null
    },
    remarks:{
        type: String,
        required: true,
        default: ''
    }
})

module.exports = mongoose.model('OfficeLog', OfficeLogModel);