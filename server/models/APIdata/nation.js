const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nationSchema = mongoose.Schema({

    name: {
        type: String,
        maxlength: 100

    },
    topLevelDomain: {
        type: Array,
        default: []
    },
    alpha2Code: {
        type: String,
        maxlength: 2

    },
    alpha3Code: {
        type: String,
        maxlength: 3

    },
    callingCodes: {
        type: Array,
        default: []
    },
    capital: {
        type: String,
        maxlength: 100

    },
    altSpellings: {
        type: Array,
        default: []
    },
    region: {
        type: String,
        maxlength: 100

    },
    subregion: {
        type: String,
        maxlength: 100

    },
    population: {
        type: Number,
        maxlength: 100
    },
    latlng: {
        type: Array,
        default: []
    },
    demonym: {
        type: String,
        maxlength: 100

    },
    area: {
        type: Number,
        maxlength: 100
    },
    gini: {
        type: Number,
        maxlength: 100
    },
    timezones: {
        type: Array,
        default: []
    },
    borders: {
        type: Array,
        default: []
    },
    nativeName: {
        type: String,
        maxlength: 100

    },

    numericCode: {
        type: String,
        maxlength: 3

    },

    currencies: {
        type: Array,
        default: []
    },

    languages: {
        type: Array,
        default: []
    },
    translations: {
        type: Object,
        default: {}
    },
    flag: {
        type: String,
        maxlength: 100

    },
    regionalBlocs: {
        type: Array,
        default: []
    },

    cioc: {
        type: String,
        maxlength: 3
    }

}, { timestamps: true });

const Nation = mongoose.model('Nation', nationSchema);

module.exports = { Nation }