const express = require('express');
const Joi = require('joi');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {MSR} = require('../modules/msrModule')


router.post('/', async (req, res) => {

    console.log(req.body)
    // res.send('Received')

    // const {error} = validateCustomer(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    
    // let user = await User.findOne({ email: req.body.email});
    // if(user) return res.status(400).send('User Already Registered.')

    let newMSR = new MSR({
        timeStamp: new Date().toISOString(),
        msrNo: req.body.msrData.msrNo,
        items: req.body.msr,
        project: req.body.msrData.project,
        createdBy: req.body.userID,
        status: 'Created',  
        prStatus: ''
    });

    await newMSR.save();

    res.status(200).send('MSR Successfully Created');

    return
    
});



module.exports = router;

