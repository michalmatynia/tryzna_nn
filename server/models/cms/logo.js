const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logoSchema = mongoose.Schema({

    lineOne: {
        required: false,
        type: String,
        maxlength: 100
    },
    images:{
        type: Array,
        default:[]
    },
    language:{
        required: true,
        type: String,
        maxlength: 4
    },
    visible:{
        required: true,
        type: Boolean
    }
},{timestamps:true});

const Logo = mongoose.model('Logo', logoSchema);

module.exports = { Logo }