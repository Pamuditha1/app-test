const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {PO} = require('../modules/poModule')

router.post('/',async function(req, res) {

    const po = await PO.findById(req.body.id)
    .populate('createdBy', '-password')
    .populate('approvedBy', '-password')

    po.status = req.body.decision
    po.reasons = req.body.reasons
    po.approvedBy = req.body.user
    po.approvedDate = new Date().toISOString()

    if(req.body.decision == "Confirmed") {
        po.grnStatus = "Pending"
    }
    await po.save()

    res.status(200).send(`PO ${req.body.decision}`)

})
// router.post('/recreated',async function(req, res) {
//     // console.log(req.body)
//     const msr = await MSR.findById(req.body.id)
//     .populate('createdBy', '-password')
//     .populate('approvedBy', '-password')

//     msr.status = req.body.decision
//     await msr.save()

//     res.status(200).send(`MSR Status Updated`)

// })



module.exports = router;

