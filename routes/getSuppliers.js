const express = require('express');
const router = express.Router();

const {User} = require('../modules/userModule')

router.get('/names',async function(req, res) {

    //get all suppliers

    const suppliers = await User.find({type: 'Supplier'}).select('-password')

    res.status(200).send(suppliers)
})

module.exports = router;

