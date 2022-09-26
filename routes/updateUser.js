const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User } = require("../modules/userModule");

router.post("/", async function (req, res) {
  const user = await User.findById(req.body.user._id);
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.contactNo = req.body.user.contactNo;
  user.address = req.body.user.address;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.pass, salt);

  await user.save();

  res.status(200).send(`${req.body.user.username} Successfully Updated`);
});

router.post("/remove/:id", async function (req, res) {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).send(`User Successfully Removed`);
});
module.exports = router;
