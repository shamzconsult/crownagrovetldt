require('dotenv').config();

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
// The port
const PORT = 5000;

// The Middleware
app.use(cors());
app.use(bodyParser.json());

// The route
app.post("/send-email", async (req, res) => {
  const { name, email, date, meetingType } = req.body;

  if (!name || !email || !date || !meetingType) {
    return res.status(400).json({ message: "All fields are required." });
  }

// Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "marrizzsalau7@gmail.com", 
    subject: "New Consultation Request",
    text: `
      Dear Crown Agrovet LTD,

      I hope this message finds you well. I am reaching out to schedule a consultation with your esteemed organization. 
      Below are my details for your reference:

      Name: ${name}
      Email: ${email}
      Preferred Date: ${date}
      Meeting Type: ${meetingType}

      Kindly let me know if the provided date and time work for your schedule, 
      or if there is an alternative that you would recommend. I look forward to your confirmation.

      Thank you for your time and assistance.

      Best regards,  
      ${name}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
