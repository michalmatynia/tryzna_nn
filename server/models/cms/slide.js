const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = mongoose.Schema({

    lineOne: {
        required: true,
        type: String,
        maxlength: 100
    },
    lineTwo: {
        required: true,
        type: String,
        maxlength: 100
    },
    position:{
        required: true,
        type: Number,
        maxlength: 4
    },
    language:{
        required: true,
        type: String,
        maxlength: 4
    },
    visible:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default:[]
    }
},{timestamps:true});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = { Slide }