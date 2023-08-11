const express = require('express');
const { GetAuthToken } = require('../middlewares/authmiddlewares');
const UserOrders = require('../models/UserOrderModel');
const { GenerateReference } = require('../utils/ServerUtils');
const Merchandise = require('../models/MerchandiseModel');
const OrderStatusCode = require('../utils/OrderStatusCode');
const routes = express.Router();

// place order
routes.post('/', GetAuthToken, async (req, res)=> {
    // prepare data
    try{
        const order = new UserOrders({
            student_id: res.issuerObjectId,
            merch_id: req.body.merch_id,
            reference: GenerateReference(),
            information: req.body.information,
            size: req.body.size,
            color: req.body.color,
            status: OrderStatusCode.ORDERED,
            quantity: req.body.quantity
        });

        const merch = await Merchandise.findById(req.body.merch_id);
        if(!merch)
            return res.status(404).json({message:"Merchandise was not found", StatusCode: 404});

        const pendingOrder = await UserOrders.findOne({student_id:res.issuerObjectId, merch_id: merch._id});

        if(pendingOrder){
            // check for order status codes, if ORDERED || PAID then cancel this request, user must claim/review the order to request
            if(pendingOrder.status === OrderStatusCode.ORDERED || pendingOrder.status === OrderStatusCode.PAID)
                return res.status(409).json({message:`You have a pending order ref: ${pendingOrder.reference} that haven't completed yet`, StatusCode: 409});
        }

        try{
            let merchstock = merch.stock;

            if(order.quantity > merchstock)
                return res.status(400).json({message:"Order quantity is greater than the merchandise stock", StatusCode: 400});
            // save
            const placedOrder = await order.save();

            merch.stock = merchstock - order.quantity;
            await merch.save();

            res.json({placedOrder, message: "Order was placed successfully", StatusCode: 200});
            
        }catch(e){
            res.status(400).json({message:"Failed place order | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
})

module.exports = routes;