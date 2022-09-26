const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {MSR} = require('../modules/msrModule')

router.post('/',async function(req, res) {

    const msr = await MSR.findById(req.body.id)
    .populate('createdBy', '-password')
    .populate('approvedBy', '-password')

    msr.status = req.body.decision
    msr.reasons = req.body.reasons
    msr.approvedBy = req.body.user
    if(req.body.decision == 'Approved') {
        msr.prStatus = "Pending"
    }
    await msr.save()

    res.status(200).send(`MSR ${req.body.decision}`)

})
router.post('/recreated',async function(req, res) {
    // console.log(req.body)
    const msr = await MSR.findById(req.body.id)
    .populate('createdBy', '-password')
    .populate('approvedBy', '-password')

    msr.status = req.body.decision
    await msr.save()

    res.status(200).send(`MSR Status Updated`)

})



module.exports = router;

