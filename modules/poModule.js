const Joi = require('joi');
const mongoose = require('mongoose');

const PO = mongoose.model('PO', new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    poNo: {
        type: String,
        ref: "MSR"
    },
    msr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MSR"
    },
    pr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PR"
    },
    items: {
        type: Array,
        require: true
    },
    poDetails: {
        type: Object,
        require: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    se: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    reasons: {
        type: String
    },
    grnStatus: {
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

exports.PO = PO;
// exports.validateCustomer = validateCustomer;
