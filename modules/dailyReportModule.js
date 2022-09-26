const Joi = require('joi');
const mongoose = require('mongoose');

const DailyReport = mongoose.model('DailyReport', new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    reportNo: {
        type: String,
        require: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"

    },
    items: [{id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }, description : {type: String}, unit: {type: String}, quantity: {type: String}, remarks: {type: String}
    }],
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

exports.DailyReport = DailyReport;
// exports.validateCustomer = validateCustomer;
