const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Mailgun = require("mailgun.js");
const fileUpload = require("express-fileupload");
const decodeToken = require("../../utils/lib.js");

//models
const User = require("../../models/User");

router.get("/confirmEmail/:token", fileUpload(), async (req, res) => {
  console.log("je suis sur la route /confirmEmail");
  const token = req.params.token;
  console.log("token in /confirmEmail:", token);
  if (token) {
    const decoded = decodeToken(token);
    console.log("decoded in /confirmEmail:", decoded);
  }
  res.status(200).json(token);
});

module.exports = router;
