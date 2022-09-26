const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {Item} = require('../modules/itemModule')

router.post('/',async function(req, res) {

    const item = await Item.findById(req.body._id).sort({_id: 'desc'})
    item.code = req.body.code
    item.name = req.body.name
    item.unit = req.body.unit
    item.reorderL = req.body.reorderL
    await item.save()
    
    res.status(200).send(`${req.body.name} Successfully Updated`)

})

module.exports = router;

