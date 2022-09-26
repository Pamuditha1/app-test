const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {PO} = require('../modules/poModule')
const {PR} = require('../modules/prModule')
const {MSR} = require('../modules/msrModule')

router.get('/count/created',async function(req, res) {

  const pos = await PO.find({status : "Created"})

  // console.log(msrs.length)
  res.status(200).send(`${pos.length}`)
})

router.get('/count/grn-pending',async function(req, res) {

  const pos = await PO.find({status : "Confirmed", grnStatus: "Pending"})

  // console.log(msrs.length)
  res.status(200).send(`${pos.length}`)
})

router.get('/count/po-rejected',async function(req, res) {

  const pos = await PO.find({status : "Rejected"})

  // console.log(msrs.length)
  res.status(200).send(`${pos.length}`)
})

router.get('/',async function(req, res) {

    const pos = await PO.find({})
    .sort({timeStamp: 'desc'})
    .populate('createdBy', '-password')
    .populate('msr')
    .populate('pr')
    .populate({
        path : 'msr',
        populate : {
          path : 'project'
        }
    })
    .populate('se', '-password')
    .populate('supplier', '-password')
    .populate('approvedBy', '-password')

    // console.log(prs)
    res.status(200).send(pos)
    // console.log(pos)

})



module.exports = router;

