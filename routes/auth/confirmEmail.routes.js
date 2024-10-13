const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Mailgun = require("mailgun.js");
const fileUpload = require("express-fileupload");

//models
const User = require("../../models/User");

router.post("/confirmEmail/:code", fileUpload(), async (req, res) => {
  console.log("je suis sur la route /confirmEmail");
  const code = req.params.code;
  if (code) {
    const user = await User.findOne({ code: code });
    console.log("code in /confirmEmail:", code);
    console.log("user in /confirmEmail:", user);
    const token = jwt.sign(
      {
        _id: user.id,
        account: user.account,
        isAdmin: user.isAdmin,
        newsletter: user.newsletter,
      },
      process.env.SRV_KEY_SECRET
    );
    user.emailIsConfirmed = true;
    user.token = token;
    await user.save();
    res.status(200).json(token);
  }
});

module.exports = router;
