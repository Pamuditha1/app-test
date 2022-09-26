const express = require('express');
const router = express.Router();

const {Project} = require('../modules/projectModule')


router.post('/', async (req, res) => {

    // check whether the project already added
    
    let project = await Project.findOne({ name: req.body.projectNo});
    if(project) return res.status(400).send('Project Already Added.')

    // create new project object 

    let newProject = new Project({
        projectNo: req.body.projectNo,
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        client: req.body.client,
        clientCoNo: req.body.clientCoNo, 
    });

    // save project

    await newProject.save();

    // response

    res.status(200).send('Project Successfully Added');
    return
    
});

module.exports = router;

