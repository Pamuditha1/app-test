const express = require('express');
const router = express.Router();

const {Project} = require('../modules/projectModule')

router.get('/',async function(req, res) {

    // get all projects

    const projects = await Project.find({}).sort({_id: 'desc'})

    res.status(200).send(projects)
})

module.exports = router;

