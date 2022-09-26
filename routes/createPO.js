const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {PR} = require('../modules/prModule')
const {MSR} = require('../modules/msrModule')
const {PO} = require('../modules/poModule')


router.post('/', async (req, res) => {

    let newPO = new PO({
        timeStamp: new Date().toISOString(),
        poNo: req.body.poNo,
        items: req.body.po,
        poDetails: req.body.poDetails,
        supplier: req.body.supplier,
        se: req.body.se,
        createdBy: req.body.user,
        msr: req.body.msr,
        pr : req.body.pr,
        status: 'Created',
        grnStatus: 'Pending'
    });
    // console.log(newPR)
    let result = await newPO.save();

    const pr = await PR.findById(req.body.pr)
    .populate('createdBy', '-_id -password')

    pr.poStatus = 'Created'
    await pr.save()

    if(result) res.status(200).send('PO Successfully Created');

    return
    
});



module.exports = router;

