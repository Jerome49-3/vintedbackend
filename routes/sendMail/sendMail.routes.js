const express = require("express");
const router = express.Router();
const formData = require("form-data");
const Mailgun = require("mailgun.js");

//config client mailgun
const mailgun = new Mailgun(formData);
const mgClient = mailgun.client({
  username: process.env.MAILGUN_USERNAME,
  key: process.env.MAILGUN_API_KEY,
});

//add routes get /send-mail:
router.get("/send-mail", async (req, res) => {
  console.log("je suis sur la route get send-mail");
  res.status(200).json({ message: "Welcome to my page get /send-mail " });
});
//add routes post /send-mail:
router.post("/send-mail", async (req, res) => {
  console.log("je suis sur la route post send-mail");
  // res.status(200).json({ message: " welcome on my route sendMail " });
  // console.log("req:", req);
  const { firstname, lastname, email, subject, message } = req.body;
  try {
    if (req.body !== undefined) {
      console.log("req.body:", req.body);
      const response = await mgClient.messages.create(
        process.env.MAILGUN_SANDBOX,
        {
          from: `${firstname} ${lastname} <${email}>`,
          to: process.env.EMAIL_TO_ME,
          subject: subject,
          text: message,
        }
      );
      console.log("response:", response);
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "bad request" });
    }
  } catch (error) {
    console.log("error:", error.status, error.message);
  }
});

module.exports = router;
