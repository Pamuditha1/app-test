const express = require("express");
const Joi = require("joi");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
var mongoose = require("mongoose");

const { PR } = require("../modules/prModule");

router.get("/count", async function (req, res) {
  const msrs = await PR.find({ status: "Created" });

  // console.log(msrs.length)
  res.status(200).send(`${msrs.length}`);
});

router.get("/count/created", async function (req, res) {
  const prs = await PR.find({ status: "Created" });

  // console.log("PR Created",prs.length)
  res.status(200).send(`${prs.length}`);
});

router.get("/count/po-pending", async function (req, res) {
  const prs = await PR.find({ poStatus: "Pending" });

  // console.log("PR Created",prs.length)
  res.status(200).send(`${prs.length}`);
});

//router.get("/", auth, async function (req, res) {
router.get("/", async function (req, res) {
  const prs = await PR.find({})
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("msr")
    .populate({
      path: "msr",
      populate: {
        path: "project",
      },
    });
  // console.log(prs)
  res.status(200).send(prs);
});

// add auth
//router.get("/:id", auth, async function (req, res) {
router.get("/:id", async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid Object Id");

  const pr = await PR.findById(req.params.id);

  if (!pr) return res.status(404).send();
  res.status(200).send(pr);
});

module.exports = router;
