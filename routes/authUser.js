const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../modules/userModule");

router.post("/", async (req, res) => {
  // check whether the user is a registered user

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email.");

  //check the password

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password.");

  //generate the token

  const token = jwt.sign(
    { _id: user._id, type: user.type, name: user.username },
    process.env.JET
  );

  //response

  res.status(200).json({
    jwt: token,
    msg: "Logged In Successfully",
    type: user.type,
  });
  return;
});

module.exports = router;
