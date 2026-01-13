const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({
  origin: [
    "https://mwuap.com",
    "https://www.mwuap.com"
  ],
  methods: ["POST"],
}));





// Contact form endpoint
app.post("/submit-form", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
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
      to: "info@mwuap.com",
      bcc: [
        "rockay@mwuap.com",
        "ak@mwuap.com",
        "admin@mwuap.com",
      ],
      replyTo: email,
      subject: `Website Message: ${subject}`,
      html: `
        <h3>New Message from MWUAP Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

   
    res.status(200).json({
      success: true,
      message: "Message sent successfully! we shall respond to you soon",
    });

  } catch (error) {
    console.error("Email send error:", error);

    res.status(500).json({
      success: false,
      message: "Email failed to send. Please try again.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});