const express = require('express');
const { ValidateAPIKey, GetAuthToken, VerifyAdmin } = require('../middlewares/authmiddlewares');
const OfficeLogModel = require('../models/OfficeLogModel');
const router = express.Router();

router.post('/', ValidateAPIKey, GetAuthToken, VerifyAdmin, async(req, res) => {
    const log = new OfficeLogModel({
        user: res.issuer,
        remarks: req.body.remarks,
        loginTime: new Date()
    })

    

    try{
        const max = new Date().toISOString();
        // default min is 100 days ago
        const min = new Date(new Date().setDate(new Date().getDate()-100)).toISOString();

        // check if there is a pending log exists, it must be logged off first
        const foundLog = await OfficeLogModel.findOne({user: res.issuer,loginTime:{$gte:min, $lt:max}, logoutTime: null})

        if(foundLog)
            return res.status(403).json({foundLog, message: "Cannot override found log, you must log out first", StatusCode: 403})
        // save 
        const savedOfficeLog = await log.save();
        res.status(201).json({savedOfficeLog, message: "Office log was recorded", StatusCode: 201});
    }catch(error){
        res.status(400).json({message: "Error on saving office log info : "+error.message, StatusCode: 400})
    }
});

router.patch('/', ValidateAPIKey, GetAuthToken, VerifyAdmin, async(req, res) => {
    const max = req.headers.maxval??new Date().toISOString();
    // default min is 100 days ago
    const min = req.headers.minval??new Date(new Date().setDate(new Date().getDate()-100)).toISOString();
    try{
        const foundLog = await OfficeLogModel.findOne({user: res.issuer,loginTime:{$gte:min, $lt:max}, logoutTime: null})

        if(!foundLog)
            return res.status(404).json({message: "No pending office log found, you have to log in first", StatusCode: 404});
        
        foundLog.logoutTime = new Date();
        // save 
        const updatedOfficeLog = await foundLog.save();
        res.status(200).json({updatedOfficeLog, message: "Office log was updated", StatusCode: 200});
    }catch(error){
        res.status(400).json({message: "Error on saving office log info : "+error.message, StatusCode: 400})
    }
});

router.get('/', ValidateAPIKey,async (req, res)=> {
    // get the option header value
    const option = req.headers.option;
    // default max is today's date
    const max = req.headers.maxval??new Date().toISOString();
    // default min is 2 days ago
    const min = req.headers.minval??new Date(new Date().setDate(new Date().getDate()-2)).toISOString();

    // grab all data
    let officeLogs = [];

    if(option === 'latest'){
        officeLogs = await OfficeLogModel.find({loginTime:{$gte:min, $lt:max}});
    }else{
        officeLogs = await OfficeLogModel.find();
    }

    return res.status(200).json({officeLogs, option, message: 'Found Office logs', StatusCode: 200})
})

module.exports = router;