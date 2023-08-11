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
        default: ""
    },
    color: {
        type: String,
        required: false,
        default: ""
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