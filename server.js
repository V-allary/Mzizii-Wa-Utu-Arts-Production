const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Contact form endpoint
app.post("/submit-form", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",  
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,  
      },
    });

    await transporter.sendMail({
      from: `"MWUAP Website" <${process.env.EMAIL_USER}>`,
      to: "info@mwuap.com", //  
      replyTo: email,
      subject: `Website Message: ${subject}`,
      html: `
        <h3>New Message from MWUAP Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).send("Email failed to send.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});