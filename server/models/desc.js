const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const descSchema = mongoose.Schema({

    mainText: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 200
    },
    language:{
        required: true,
        type: String,
        maxlength: 4
    },
    publish:{
        required: true,
        type: Boolean
    },
    translate:{
        required: true,
        type: Boolean
    }
},{timestamps:true});

const Desc = mongoose.model('Description', descSchema);

module.exports = { Desc }