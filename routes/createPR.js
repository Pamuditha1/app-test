const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PR } = require("../modules/prModule");
const { MSR } = require("../modules/msrModule");

router.post("/", async (req, res) => {
  let newPR = new PR({
    timeStamp: new Date().toISOString(),
    prNo: req.body.prNo,
    items: req.body.pr,
    createdBy: req.body.user,
    msr: req.body.msr._id,
    poStatus: "Pending",
    status: "Created",
  });
  // console.log(newPR)
  let result = await newPR.save();

  const msr = await MSR.findById(req.body.msr._id).populate(
    "createdBy",
    "-_id -password"
  );

  msr.prStatus = "Created";
  await msr.save();

  if (result) res.status(200).send("PR Successfully Created");

  return;
});

module.exports = router;
