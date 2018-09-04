const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Users schema 
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Phone: {
        type: String,
        required: true
    },
});
module.exports = User = mongoose.model('users', UserSchema);