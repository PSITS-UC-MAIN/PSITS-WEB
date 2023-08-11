const mongoose = require('mongoose');

const MerchandiseModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },
    stock: {
        type: Number,
        required: false,
        default: 0,
    },
    photo_img_links:{
        type: Array,
        required: true,
        default: new Array(),
    },
    size: {
        type: String,
        required: false,
        default: "",
    },
    color: {
        type: String,
        required: false,
        default: "",
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    showPublic: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = mongoose.model('Merchandise', MerchandiseModel);