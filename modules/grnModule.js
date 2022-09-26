const Joi = require('joi');
const mongoose = require('mongoose');

const GRN = mongoose.model('GRN', new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    grnNo: {
        type: String
    },
    msr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MSR"
    },
    pr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PR"
    },
    po: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PO"
    },
    items: {
        type: Array,
        require: true
    },
    deliveredOn: {
        type: String
    },
    deliveredOnTime: {
        type: String
    },
    remarks: {
        type: String
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
    
}));

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }

exports.GRN = GRN;
// exports.validateCustomer = validateCustomer;
