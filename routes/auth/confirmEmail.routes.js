const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Mailgun = require("mailgun.js");
const fileUpload = require("express-fileupload");

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
