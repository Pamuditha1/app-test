const express = require('express');
const router = express.Router();

const {Item} = require('../modules/itemModule')

router.get('/',async function(req, res) {

    // get all items

    const items = await Item.find({}).sort({quantity: 'desc'})

    res.status(200).send(items)

})

module.exports = router;

