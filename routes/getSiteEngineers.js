const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {User} = require('../modules/userModule')

router.get('/',async function(req, res) {

    const ses = await User.find({type: 'Site Engineer'}).select('-password')

    // console.log(msrs.length)
    res.status(200).send(ses)
})

module.exports = router;

