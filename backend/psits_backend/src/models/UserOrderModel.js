const mongoose = require('mongoose');
const { GenerateReference } = require('../utils/ServerUtils');
const Schema = mongoose.Schema;

const UserOrderModel = new mongoose.Schema({
    student_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    merch_id:{
        type: Schema.Types.ObjectId,
        ref: "Merchandise",
        required: true
    },
    price:{
        type: Number,
        required: false,
        default: 0
    },
    reference: {
        type: String,
        required: false,
        default: GenerateReference()
    },
    information: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: false,
        default: "N/A"
    },
    color: {
        type: String,
        required: false,
        default: "N/A"
    },
    style: {
        type: String,
        required: false,
        default: "N/A"
    },
    status:{
        type: String,
        required: false,
        default: "ORDERED",
    },
    review: {
        type: String,
        required: false,
        default: ""
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    }
})

module.exports = mongoose.model('UserOrder', UserOrderModel);