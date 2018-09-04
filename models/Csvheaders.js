const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Users schema 
const CsvheadersSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    csvhearders: {
        type: {},
        default: {}

    },
    created_By: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, //String,

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Csvheaders = mongoose.model('Csvheaders', CsvheadersSchema);