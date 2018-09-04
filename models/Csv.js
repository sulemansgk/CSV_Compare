const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Users schema 
const CsvDataSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    csvhearders: {
        type: {},
        default: {}

    },
    csv_data: {
        type: {},
        default: {}
    }, //String,

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Csvdata = mongoose.model('Csvdata', CsvDataSchema);