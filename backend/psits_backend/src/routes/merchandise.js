const express = require('express');
const { GetAuthToken, VerifyAdmin } = require('../middlewares/authmiddlewares');
const Merchandise = require('../models/MerchandiseModel');
const routes = express.Router();

// create new merchandise
routes.post('/', GetAuthToken, VerifyAdmin, async (req, res)=> {
    const merch = new Merchandise({
        title: req.body.title,
        information: req.body.information,
        price: req.body.price,
        discount: req.body.discount,
        stock: req.body.stock,
        photo_img_links: req.body.photo_img_links,
        size: req.body.size,
        color: req.body.color,
        showPublic: req.body.showPublic
    });

    // save
    try{
        const newMerchandise = await merch.save();
        res.status(201).json({newMerchandise, message: "New Merchandise was created", StatusCode: 201});
    }catch(e){
        res.status(400).json({message: "Failed to save merchandise | error: "+e.message, StatusCode: 400});
    }
});

// get all merch
routes.get('/', async(req, res)=> {
    const merchandiseData = await Merchandise.find();

    res.json({merchandiseData, Size: merchandiseData.length ,message: "Retrieved Merchandise info", StatusCode: 200});
})

// update merch
routes.patch('/:merchid', GetAuthToken, VerifyAdmin, async (req, res) => {
    let merch;

    if(!req.params.merchid)
        return res.status(400).json({message:"MerchID should be specified at the parameter", StatusCode: 400});

    try{
        merch = await Merchandise.findById(req.params.merchid);

        if(!merch)
            return res.status(404).json({message: "Merchandise not found", StatusCode: 404});

        // do the patch
        if(req.body.title)
            merch.title = req.body.title;
        if(req.body.information)
            merch.title = req.body.information;
        if(req.body.price)
            merch.price = req.body.price;
        if(req.body.discount)
            merch.discount = req.body.discount;
        if(req.body.stock)
            merch.stock = req.body.stock;
        if(req.body.photo_img_links)
            merch.photo_img_links = req.body.photo_img_links;
        if(req.body.size)
            merch.size = req.body.size;
        if(req.body.color)
            merch.color = req.body.color;
        if(req.body.rating)
            merch.rating = merch.rating>0?((merch.rating + req.body.rating)/2):req.body.rating;
        if(req.body.showPublic !== undefined)
            merch.showPublic = req.body.showPublic;

        // save
        try{
            const newMerchandise = await merch.save();
            res.json({newMerchandise, message: "Merchandise information was updated", StatusCode: 200});
        }catch(e){
            res.status(400).json({message:"Failed to update merchandise | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
})

// delete merch
routes.delete('/:merchid', GetAuthToken, VerifyAdmin, async (req, res)=> {
    let merch;

    if(!req.params.merchid)
        return res.status(400).json({message:"MerchID should be specified at the parameter", StatusCode: 400});

    try{
        merch = await Merchandise.findById(req.params.merchid);

        if(!merch)
            return res.status(404).json({message: "Merchandise not found", StatusCode: 404});

        // delete
        try{
            await merch.deleteOne();
            res.json({message: "Merchandise was deleted", StatusCode: 200});
        }catch(e){
            res.status(400).json({message:"Failed to remove merchandise | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
});

module.exports = routes;