const express = require('express');
const routes = express.Router();

const Events = require('../models/EventModel');
const { GetAuthToken, VerifyAdmin } = require('../middlewares/authmiddlewares');

// post new event
routes.post('/', GetAuthToken, VerifyAdmin, async (req, res) => {
    const event = new Events({
        title: req.body.title,
        eventDate: req.body.eventDate,
        content: req.body.content,
        photo_img_links: req.body.photo_img_links
    });

    // save
    try{
        const newEvent = await event.save();
        res.status(201).json({newEvent, message: "Event was posted", StatusCode: 201});
    }catch(e){
        res.status(400).json({message: "Failed to post event | error : "+ e.message, StatusCode: 400});
    }
})

// get all events
routes.get('/', async (req, res)=> {
    const events = await Events.find();

    res.json({events, message:"Retrieved School Events", StatusCode: 200});
});

// update event
routes.patch('/:eventid', GetAuthToken, VerifyAdmin, async (req, res)=> {
    if(!req.params.eventid)
        return res.status(400).json({message: "EventID must be provided at the request parameter", StatusCode: 400});

    try{
        const event = await Events.findById(req.params.eventid);

        if(!event)
            return res.status(404).json({message:"Cannot find School Event", StatusCode: 404});

        if(req.body.title)
            event.title = req.body.title;
        if(req.body.eventDate)
            event.eventDate = req.body.eventDate;
        if(req.body.content)
            event.content = req.body.content;
        if(req.photo_img_links)
            event.photo_img_links = req.body.photo_img_links;

        // save
        try{
            const newEvent = await event.save();
            res.json({newEvent, message: "Updated School Event", StatusCode: 200});
        }catch(e){
            res.status(400).json({message:"Failed to update School Events | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
});

// delete event
routes.delete('/:eventid', GetAuthToken, VerifyAdmin, async(req,res)=> {
    if(!req.params.eventid)
        return res.status(400).json({message: "EventID must be provided at the request parameter", StatusCode: 400});

    try{
        const event = await Events.findById(req.params.eventid);

        if(!event)
            return res.status(404).json({message:"Cannot find School Event", StatusCode: 404});

        try{
            await event.deleteOne();
            res.json({message: "School Event was deleted", StatusCode: 200});
        }catch(e){
            res.status(400).json({message:"Failed to update School Events | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
});


module.exports = routes;