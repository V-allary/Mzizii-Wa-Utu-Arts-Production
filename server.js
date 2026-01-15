require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors({
  origin: [
    "https://mwuap.com",
    "https://www.mwuap.com",
    "http://localhost:5500"
  ],
  methods: ["POST"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   EMAIL TRANSPORTER (ONCE)
================================ */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ===============================
   CONTACT FORM ENDPOINT
================================ */
app.post("/submit-form", async (req, res) => {
  const { name, email, subject, message } = req.body;
 
  
if (req.body.website) {
  return res.status(200).json({ success: true });
}

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
    await transporter.sendMail({
      from: `"MWUAP Website" <${process.env.EMAIL_USER}>`,
      to: "info@mwuap.com",
      bcc: [
        "rockay@mwuap.com",
        "ak@mwuap.com",
        "admin@mwuap.com",
        "jo@mwuap.com",
      ],
      replyTo: email,
      subject: `Website Message: ${subject}`,
      html: `
        <h3>New Message from MWUAP Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully."
    });

  } catch (error) {
    console.error("Email send error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message."
    });
  }
});


app.get("/", (req, res) => {
  res.send("MWUAP Server is running.");
});

/* ===============================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});