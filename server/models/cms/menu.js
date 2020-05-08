const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        maxlength: 200
    },
    linkTo: {
        required: true,
        type: String,
        maxlength: 200
    },
    level: {
        required: true,
        type: String,
        maxlength: 200
    },
    position:{
        required: true,
        type: Number,
        maxlength: 4
    },
    public: {
        required: true,
        type: Boolean,
    },
    language:{
        required: true,
        type: String,
        maxlength: 4
    },
    visible: {
        required: true,
        type: Boolean,
    }
},{timestamps:true});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = { Menu }