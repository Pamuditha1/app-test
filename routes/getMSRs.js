const express = require("express");
const Joi = require("joi");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { MSR } = require("../modules/msrModule");

router.get("/count", async function (req, res) {
  const msrs = await MSR.find({ status: "Created" });

  // console.log(msrs.length)
  res.status(200).send(`${msrs.length}`);
});

router.get("/count/approved", async function (req, res) {
  const msrs = await MSR.find({ status: "Approved" });

  // console.log(msrs.length)
  res.status(200).send(`${msrs.length}`);
});
router.get("/count/rejected", async function (req, res) {
  const msrs = await MSR.find({ status: "Rejected" });

  // console.log(msrs.length)
  res.status(200).send(`${msrs.length}`);
});

router.get("/count/pr-pending", async function (req, res) {
  const msrs = await MSR.find({ prStatus: "Pending" });

  // console.log(msrs.length)
  res.status(200).send(`${msrs.length}`);
});

router.get("/:id", async function (req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Id");

  const msr = await MSR.findById(req.params.id)
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("approvedBy", "-password")
    .populate("project");

  // console.log(orders)
  res.status(200).send(msr);
});

// add auth middle
router.get("/", async function (req, res) {
  const msrs = await MSR.find({})
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("approvedBy", "-password")
    .populate("project");

  // console.log(orders)
  res.status(200).send(msrs);
});

module.exports = router;
