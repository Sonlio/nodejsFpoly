const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    typeUser: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('users', postSchema);