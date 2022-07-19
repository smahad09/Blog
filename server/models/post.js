const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    coverImage: {
        type: String,
        required: true,
        default: null,
    },
    header: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Post", PostSchema);