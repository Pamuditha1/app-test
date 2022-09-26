const mongoose = require('mongoose');

const Project = mongoose.model('Project', new mongoose.Schema({
    projectNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
    },
    client: {
        type: String,
    },
    clientCoNo: {
        type: String,
    },    
    status: {
        type: String,
    },
    suppliers: {
        type: Array
    },
    items: {
        type: Array
    },
    started: {
        type: String
    },
    completed: {
        type: String
    }
}));

exports.Project = Project;
