const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {DailyReport} = require('../modules/dailyReportModule')

router.get('/',async function(req, res) {

    const dus = await DailyReport.find({})
    .sort({timeStamp: 'desc'})
    .populate('createdBy', '-password')
    .populate('project')
    .populate({
        model : 'Item',
        path : 'items.id'
    })

    // console.log(prs)
    res.status(200).send(dus)
    // console.log(pos)

})

module.exports = router;

