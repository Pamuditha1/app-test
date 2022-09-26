const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    contactNo: {
        type: String
    },
    contactNo2: {
        type: String
    },
    nic: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    credit: {
        type: String
    },
    projects: {
        type: Array
    },
    items: {
        type: String
    },
    district: {
        type: String
    },
}));

exports.User = User;
