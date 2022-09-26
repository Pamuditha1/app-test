const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {PO} = require('../modules/poModule')
const {GRN} = require('../modules/grnModule')
const {User} = require('../modules/userModule')
const {Item} = require('../modules/itemModule')
const {Project} = require('../modules/projectModule')

router.post('/', async (req, res) => {

    let newGRN = new GRN({
        timeStamp: new Date().toISOString(),
        grnNo: req.body.grnNo,
        items: req.body.grnsList,
        deliveredOn: req.body.deliveredOn,
        deliveredOnTime: req.body.deliveredOnTime,
        remarks: req.body.remarks,
        createdBy: req.body.user,
        msr: req.body.msr,
        pr : req.body.pr,
        po: req.body.po,
        status: 'Created'
    });
    // console.log(newPR)
    let result = await newGRN.save();

    //save GRN
    const po = await PO.findById(req.body.po)
    po.grnStatus = 'Created'
    await po.save()

    //calculate credit
    let credit = 0
    req.body.grnsList.forEach(i => {
        let total = parseInt(i.rate)*parseInt(i.deleveredQty)
        credit = credit + total
    });

    console.log(req.body.paymentType)

    //credit supplier
    if(req.body.paymentType == "Credit") {

        const supplier = await User.findById(req.body.supplier).select('-password')
        if(supplier.credit) {
            supplier.credit = parseInt(supplier.credit)  + parseInt(credit) 
        }
        else {
            supplier.credit = credit
        }

        if(supplier.projects) {
            if(!supplier.projects.includes(req.body.project)) supplier.projects.push(req.body.project)
        }
        supplier.projects = [req.body.project]

        supplier.save()

    }    

    //increase inventory, add projects & suppliers
    req.body.grnsList.forEach(i => {

        Item.findOne({name : i.description})
        .then(item => {
            item.quantity = parseInt(item.quantity) + parseInt(i.deleveredQty) 

            if(item.projects) {
                if(!item.projects.includes(req.body.project)) item.projects.push(req.body.project)
            }
            item.projects = [req.body.project]

            if(item.suppliers) {
                if(!item.suppliers.includes(req.body.supplierName)) item.suppliers.push(req.body.supplierName)
            }
            item.suppliers = [req.body.supplierName]

            item.save()
        })

    })

    //add products, items to project
    const project = await Project.findById(req.body.projectID)
    if(project.suppliers) {
        if(!project.suppliers.includes(req.body.supplierName)) project.suppliers.push(req.body.supplierName)
    }
    project.suppliers = [req.body.supplierName]
    await project.save()

    if(result) res.status(200).send('GRN Successfully Created');

    return
    
});

module.exports = router;

