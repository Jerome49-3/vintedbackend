const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Mailgun = require("mailgun.js");

//config mailgun
const mailgun = new Mailgun();
const mgClient = mailgun.client({
  username: process.env.MAILGUN_USERNAME,
  key: process.env.MAILGUN_API_KEY,
});

router.post("/confirmEmail", fileUpload(), async (req, res) => {
  console.log("je suis sur la route /confirmEmail");
  const token = req.params.token;
  console.log("token in /confirmEmail:", token);
  if (token) {
    const decoded = jwtDecode(token);
    console.log("decoded in /confirmEmail:", decoded);
  }
});

module.exports = router;
