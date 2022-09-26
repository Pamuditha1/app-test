const Joi = require('joi');
const mongoose = require('mongoose');

const MSR = mongoose.model('MSR', new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    msrNo: {
        type: String,
        require: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"

    },
    // items: {
    //     type: Array,
    //     require: true
    // },
    items: [{id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }, description : {type: String}, unit: {type: String}, quantity: {type: String}, remarks: {type: String}
    }],
    // products: [{id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product"
    // }, size : {type: String} , qty : {type : 'String'} , total : {type : 'String'}
    // }],
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
    prStatus: {
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

exports.MSR = MSR;
// exports.validateCustomer = validateCustomer;
