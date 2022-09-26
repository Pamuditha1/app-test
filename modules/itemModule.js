const mongoose = require('mongoose');

const Item = mongoose.model('Item', new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        require: true
    },
    quantity: {
        type: String
    },
    reorderL: {
        type: String
    },
    projects: {
        type: Array
    },
    suppliers: {
        type: Array
    }
}));

exports.Item = Item;
