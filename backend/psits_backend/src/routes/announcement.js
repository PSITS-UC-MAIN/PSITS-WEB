const express = require('express');
const { GetAuthToken, VerifyAdmin } = require('../middlewares/authmiddlewares');
const Announcement = require('../models/AnnouncementModel');
const { ParseAnnouncement } = require('../utils/ServerUtils');
const routes = express.Router();

// post announcement
routes.post('/', GetAuthToken, VerifyAdmin, async (req, res) => {
    const ann = new Announcement({
        title: req.body.title,
        author: res.issuerObjectId,
        content: req.body.content,
        photo_img_links: req.body.photo_img_links
    })

    try{
        const announcement = await ann.save();
        res.status(200).json({NewAnnouncement: await ParseAnnouncement(announcement), message: "Posted announcement", StatusCode: 200})
    }catch(error){
        res.status(400).json({message: "Failed to post announcement | error : "+error.message, StatusCode: 400})
    }
})

// get all announcements
routes.get('/', async (req, res) => {
    // grab all data
    const anncmnt = await Announcement.find();

    // parsed data
    const data = [];
    for(const announcement of anncmnt){
        data.push(await ParseAnnouncement(announcement))
    }

    res.status(200).json({Announcements: data, Size:data.length,message: "Retrieved announcements info", StatusCode: 200})
});

// update announcement
routes.patch('/:announcementid', GetAuthToken, VerifyAdmin, async (req, res)=> {
    if(!req.params.announcementid)
        return res.status(400).json({message: "AnnouncementID must be a query param", StatusCode: 400});
    
    try{
        const announcement = await Announcement.findOne({_id: req.params.announcementid});

        if(!announcement)
            return res.status(404).json({message: "Announcement not found", StatusCode: 404});

        if(req.body.title)
            announcement.title = req.body.title;
        if(req.body.content)
            announcement.content = req.body.content;
        if(req.body.photo_img_links)
            announcement.photo_img_links = req.body.photo_img_links;
        
        // save
        try{
            const newAnnouncement = await announcement.save();
            res.json({NewAnnouncement:await ParseAnnouncement(newAnnouncement), message: "Updated Announcement", StatusCode: 200});
        }catch(e){
            res.status(400).json({message:"Failed to update announcement | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
})

// delete announcement
routes.delete('/:announcementid', GetAuthToken, VerifyAdmin, async (req, res)=>{
    if(!req.params.announcementid)
        return res.status(400).json({message: "AnnouncementID must be a query param", StatusCode: 400});
    
    try{
        const announcement = await Announcement.findOne({_id: req.params.announcementid});

        if(!announcement)
            return res.status(404).json({message: "Announcement not found", StatusCode: 404});

        // remove
        try{
            await announcement.deleteOne();
            res.json({message: "Deleted Announcement", StatusCode: 200});
        }catch(e){
            res.status(400).json({message:"Failed to delete announcement | error: "+e.message, StatusCode: 400});
        }
    }
    catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
})

module.exports = routes;