const Joi = require('joi');
const mongoose = require('mongoose');

const PR = mongoose.model('PR', new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    prNo: {
        type: String,
        required: true
    },
    msr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MSR"
    },
    items: {
        type: Array,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    approvedDate: {
        type: String
    },
    status: {
        type: String
    },    
    poStatus: {
        type: String
    },
    reasons: {
        type: String
    }
}));

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }

exports.PR = PR;
// exports.validateCustomer = validateCustomer;
