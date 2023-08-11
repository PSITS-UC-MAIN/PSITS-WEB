const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: false,
        default: new Date(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    photo_img_links:{
        type: Array,
        required: false,
        default: new Array()
    }
})

module.exports = mongoose.model('Announcement', AnnouncementSchema);