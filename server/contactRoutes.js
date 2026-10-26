
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const projectTypes = [
  "Residential Interior",
  "Modular Kitchen",
  "Bedroom Design",
  "Office / Workspace",
  "Custom Furniture",
  "Commercial Interior",
];

const budgets = [
  "Below ₹5 Lakh",
  "₹5 – ₹10 Lakh",
  "₹10 – ₹20 Lakh",
  "₹20 – ₹30 Lakh",
  "₹30+ Lakh",
];

const cleanText = (value) =>
  typeof value === "string" ? value.trim() : "";

router.post("/", async (req, res) => {
  try {
    const name = cleanText(req.body.name);
    const email = cleanText(req.body.email);
    const phone = cleanText(req.body.phone);
    const projectType = cleanText(req.body.projectType);
    const budget = cleanText(req.body.budget);
    const message = cleanText(req.body.message);

    if (
      name.length < 2 ||
      name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      !/^[+0-9() -]{8,20}$/.test(phone) ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return res.status(400).json({
        message: "Please check your details and try again.",
      });
    }

    if (
      (projectType && !projectTypes.includes(projectType)) ||
      (budget && !budgets.includes(budget))
    ) {
      return res.status(400).json({
        message: "Please select a valid project type and budget.",
      });
    }

    const { EMAIL_USER, EMAIL_APP_PASSWORD, CONTACT_RECEIVER } =
      process.env;

    if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !CONTACT_RECEIVER) {
      console.error("Contact email environment variables are missing.");

      return res.status(503).json({
        message:
          "Email service is not configured yet. Please contact us by email or WhatsApp.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"PRO Vistaar Website" <${EMAIL_USER}>`,
      to: CONTACT_RECEIVER,
      replyTo: {
        name,
        address: email,
      },
      subject: `New Project Enquiry — ${name}`,
      text: [
        "New enquiry received from the PRO Vistaar website",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project Type: ${projectType || "Not specified"}`,
        `Estimated Budget: ${budget || "Not specified"}`,
        "",
        "Project Details:",
        message,
      ].join("\n"),
    });

    return res.status(200).json({
      message:
        "Thank you! Your enquiry has been sent successfully. Our team will contact you.",
    });
  } catch (error) {
    console.error("Contact form email failed:", error.message);

    return res.status(500).json({
      message:
        "We could not send your enquiry right now. Please try again or contact us directly.",
    });
  }
});

module.exports = router;
