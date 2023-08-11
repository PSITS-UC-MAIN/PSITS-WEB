const express = require('express');
const { GetAuthToken, VerifyAdmin } = require('../middlewares/authmiddlewares');
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

            // reduce the stock of the merch and save it
            merch.stock = merchstock - order.quantity;
            await merch.save();

            res.json({placedOrder, message: "Order was placed successfully", StatusCode: 200});
            
        }catch(e){
            res.status(400).json({message:"Failed place order | error: "+e.message, StatusCode: 400});
        }
    }catch(e){
        res.status(500).json({message:"Internal Server Error | Make sure that the parameter values are correct", StatusCode: 500});
    }
});


// get a specific order
// :search - can be an orderID or a reference code
// make sure that only authenticated users can request
routes.get("/:search", GetAuthToken, async (req, res) => {
    // validate search parameter, otherwise, return a Bad Request
    if(!req.params.search)
        return res.status(400).json({message: "Specify the search parameter", StatusCode: 400});

    try{
        // check if it can find using the reference code
        let order = await UserOrders.findOne({reference: req.params.search});
        
        // check if it can find using the _id
        if(!order){
            try{
                order = await UserOrders.findById(req.params.search);
            }catch(e){ /* ignore */}
        } 

        // otherwise return Not Found
        if(!order)
            return res.status(404).json({message: "Failed to retrieved order, not found", StatusCode: 404});

        // only users that are authenticated with the request or
        // admins can get the requested order, the PUBLIC should not be
        // able to view this information
        if(!res.isAdmin || res.issuerObjectId.toString() !== order.student_id.toString())
            return res.status(403).json({message: "You are forbidden to access this order information", StatusCode: 403});

        // return the requested resource to the user
        return res.json({order, message: "Retrieved order successfuly", StatusCode: 200});
    }catch(error){
        // return a bad request when something happens with the parameter value
        res.status(400).json({message: "Failed to retrieve order info based on the search parameter provided", StatusCode: 400});
    }
});


// get all orders
// caveat: All orders should only be retrieved on Authenticated Users that are admins
routes.get('/', GetAuthToken, VerifyAdmin, async (req, res) => {
    const user_orders = await UserOrders.find();

    res.json({user_orders, Size: user_orders.length, message: "Retrieved user orders", StatusCode: 200});
});

// update order, make sure that only the person who orders
// or an admin can change the information of a specific order
routes.patch('/:search', GetAuthToken, async (req, res)=> {
    // validate search parameter, otherwise, return a Bad Request
    if(!req.params.search)
    return res.status(400).json({message: "Specify the search parameter", StatusCode: 400});

    try{
        // check if it can find using the reference code
        let order = await UserOrders.findOne({reference: req.params.search});

        // check if it can find using the _id
        if(!order){
            try{
                order = await UserOrders.findById(req.params.search);
            }catch(e){ /* ignore */}
        } 

        // otherwise return Not Found
        if(!order)
            return res.status(404).json({message: "Failed to retrieved order, not found", StatusCode: 404});

        // only users that are authenticated with the request or
        // admins can get the requested order, the PUBLIC should not be
        // able to view this information
        if(!res.isAdmin && res.issuerObjectId.toString() !== order.student_id.toString())
            return res.status(403).json({message: "You are forbidden to access this order information", StatusCode: 403});

        // do the update
        /*
            Documentation as of Aug 11, 2023 -- by: Jayharron Mar Abejar ... see info below ...
            Caveat: the customer[user] can change information, size, quantity and color with ease.
                    as for status, once ORDERED, they can only CANCEL, and CANCELLED order
                    cannot be returned to ORDERED status. for PAID orders, they can then REVIEW 
                    and review, rating fields are updated. For now, users can only review once. 
                    CANCELLED status should no longer be updated!

                    From ORDERED to CANCELLED -> merch.stock must be returned based on the
                        quantity of order.
                    
                    From PAID to REVIEWED -> review and rating fields are accepted

                    For Admins: They can change everything except student_id, merch_id, review,
                        and rating.

                    Since Admins can change from CANCELLED to ORDERED/PAID, change the merch.stock
                        and deduct it from the order.quantity, if the merch.stock < order.quantity,
                        then abort the update.
        */
        // retrieve the merch info
        const merch = await Merchandise.findById(order.merch_id);
        
        const {information, size, color, review, rating, quantity} = req.body;
        const status = OrderStatusCode.getStatusCode(req.body.status)
        const old_status = OrderStatusCode.getStatusCode(order.status);
        const old_quantity = order.quantity;

        // forbid users that are not admins to change information if already cancelled
        if(old_status === OrderStatusCode.CANCELLED && !res.isAdmin)
            return res.status(403).json({message: "You are forbidden to update already cancelled order!", StatusCode: 403});

        // update basic order info
        if(information)
            order.information = information;
        if(size)
            order.size = size;
        if(color)
            order.color = color;
        if(quantity)
            order.quantity = quantity;

        // check if the order status code is valid
        if(status !== OrderStatusCode.INVALID){
            // update the order status
            order.status = status;

            // if just cancelled, update the merch stock, add the order quantity
            if(order.status === OrderStatusCode.CANCELLED && old_status !== OrderStatusCode.CANCELLED)
                merch.stock = merch.stock + old_quantity;
            
            // if just updated back to ordered or to paid from being cancelled and isAdmin update, reduce the merch stock
            if((status === OrderStatusCode.ORDERED || status === OrderStatusCode.PAID) && old_status === OrderStatusCode.CANCELLED && res.isAdmin){
                const currentMerchStock = merch.stock;
                if(currentMerchStock < order.quantity)
                    return res.status(400).json({message:"Order quantity is greater than the merchandise stock", StatusCode: 400})
                
                merch.stock = currentMerchStock - order.quantity;
            }

            // on user review and rating, make sure that this is the user itself
            // verify user
            if(res.issuerObjectId.toString() === order.student_id.toString()){
                // make sure that the old status is not REVIEWED
                if(status === OrderStatusCode.REVIEWED){
                    if(old_status !== OrderStatusCode.REVIEWED){

                        // set the review, change the merch rating
                        if(rating){
                            merch.rating = merch.rating>0?((merch.rating + rating)/2):rating;
                            order.rating = rating;
                        }
                        if(review)
                            order.review = review;
                        
                    }else{
                        return res.status(403).json({message:"You are forbidden to update reviewed order", StatusCode: 403})
                    }
                }
            }
        }

        const updatedOrder = await order.save();
        await merch.save();

        res.json({updatedOrder, message: "Updated Order Information", StatusCode: 200});

    }catch(error){
    // return a bad request when something happens with the parameter value
        res.status(400).json({message: "Failed to retrieve order info. error: "+error.message, StatusCode: 400});
    }
});


// delete an order : make sure that the user has admin rights!
routes.delete('/:search', GetAuthToken, VerifyAdmin, async (req, res)=> {
    // validate search parameter, otherwise, return a Bad Request
    if(!req.params.search)
        return res.status(400).json({message: "Specify the search parameter", StatusCode: 400});

    try{
        // check if it can find using the reference code
        let order = await UserOrders.findOne({reference: req.params.search});
        
        // check if it can find using the _id
        if(!order){
            try{
                order = await UserOrders.findById(req.params.search);
            }catch(e){ /* ignore */}
        } 

        // otherwise return Not Found
        if(!order)
            return res.status(404).json({message: "Failed to retrieved order, not found", StatusCode: 404});

        // delete the order
        await order.deleteOne();
        
        // return the requested resource to the user
        return res.json({message: "The Order was deleted successfuly", StatusCode: 200});
    }catch(error){
        // return a bad request when something happens with the parameter value
        res.status(400).json({message: "Failed to retrieve order info based on the search parameter provided", StatusCode: 400});
    }
})

module.exports = routes;