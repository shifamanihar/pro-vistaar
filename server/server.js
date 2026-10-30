
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import adminDataRouter from "./adminDataRouter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================
// MIDDLEWARE
// =====================================


app.use(express.json({ limit: "20kb" }));

// CORS must run before API routes
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://pro-vistaar.vercel.app",
  ...(process.env.FRONTEND_ORIGIN || "")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean)
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Mount the admin router AFTER CORS
app.use("/api/admin", adminDataRouter);



// =====================================
// SHARED HELPERS
// =====================================

const cleanText = (value) =>
  typeof value === "string" ? value.trim() : "";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function convertRating(rating) {
  const ratings = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  return typeof rating === "number"
    ? rating
    : ratings[rating] || 0;
}

// =====================================
// CONTACT FORM — RESEND EMAIL
// =====================================

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
  "₹5–10 Lakh",
  "₹10–20 Lakh",
  "₹20–30 Lakh",
  "₹30+ Lakh",
];

app.post("/api/contact", async (req, res) => {
  try {
    const name = cleanText(req.body?.name);
    const email = cleanText(req.body?.email);
    const phone = cleanText(req.body?.phone);
    const projectType = cleanText(req.body?.projectType);
    const budget = cleanText(req.body?.budget);
    const message = cleanText(req.body?.message);

    if (
      name.length < 2 ||
      name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      !/^[0-9()+ -]{8,20}$/.test(phone) ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return res.status(400).json({
        message:
          "Please check your name, email, phone and project details.",
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

    const apiKey = process.env.RESEND_API_KEY;
    const receiver = process.env.CONTACT_RECEIVER;
    const sender =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !receiver) {
      console.error("Contact email configuration is missing.");

      return res.status(503).json({
        message: "Email service is not configured yet.",
      });
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeProjectType = escapeHtml(
      projectType || "Not specified"
    );
    const safeBudget = escapeHtml(budget || "Not specified");
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: `PRO Vistaar Website <${sender}>`,
      to: [receiver],
      replyTo: email,
      subject: `New Project Enquiry — ${name}`,

      text: [
        "New project enquiry from the PRO Vistaar website",
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

      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#071352">
          <h2 style="color:#f62d91">New PRO Vistaar Project Enquiry</h2>
          <p>A customer has submitted the contact form.</p>

          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:10px;border:1px solid #ddd"><b>Name</b></td>
              <td style="padding:10px;border:1px solid #ddd">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd"><b>Email</b></td>
              <td style="padding:10px;border:1px solid #ddd">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd"><b>Phone</b></td>
              <td style="padding:10px;border:1px solid #ddd">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd"><b>Project Type</b></td>
              <td style="padding:10px;border:1px solid #ddd">${safeProjectType}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd"><b>Budget</b></td>
              <td style="padding:10px;border:1px solid #ddd">${safeBudget}</td>
            </tr>
          </table>

          <h3>Project Details</h3>
          <p style="white-space:pre-wrap">${safeMessage}</p>
        </div>
      `,
    });

    if (error || !data?.id) {
      console.error("Resend email error:", error || "No email ID returned");

      return res.status(502).json({
        message: "Email could not be sent. Please try again later.",
      });
    }

    console.log("Resend accepted email:", data.id);

    return res.status(200).json({
      message:
        "Your enquiry has been accepted for email delivery.",
    });
  } catch (error) {
    console.error("Contact form error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while sending your enquiry.",
    });
  }
});

// =====================================
// ADMIN AUTHENTICATION
// =====================================

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  if (!token || !process.env.JWT_SECRET) {
    return res.status(401).json({
      message: "Please log in to access the admin panel.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded.role !== "admin" ||
      decoded.email !== (process.env.ADMIN_EMAIL || "").toLowerCase()
    ) {
      return res.status(403).json({
        message: "Admin access denied.",
      });
    }

    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({
      message: "Session expired. Please log in again.",
    });
  }
}

app.post("/api/admin/login", (req, res) => {
  const email = cleanText(req.body?.email).toLowerCase();
  const password =
    typeof req.body?.password === "string"
      ? req.body.password
      : "";

  const adminEmail = (
    process.env.ADMIN_EMAIL || ""
  ).toLowerCase();

  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(503).json({
      message: "Admin login is not configured on the server.",
    });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      message: "Incorrect email or password.",
    });
  }

  const token = jwt.sign(
    { email: adminEmail, role: "admin" },
    jwtSecret,
    { expiresIn: "8h" }
  );

  return res.json({
    token,
    admin: { email: adminEmail },
  });
});

// =====================================
// ADMIN — RESEND EMAIL LIST
// =====================================

app.get("/api/admin/emails", requireAdmin, async (req, res) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        message: "Resend API key is not configured.",
      });
    }

    const limitValue = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(limitValue)
      ? Math.min(100, Math.max(1, limitValue))
      : 20;

    const options = { limit };

    if (typeof req.query.after === "string") {
      options.after = req.query.after;
    }

    if (typeof req.query.before === "string") {
      options.before = req.query.before;
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.list(options);

   if (error) {
  console.error(
    "Resend list emails error:",
    JSON.stringify(error, null, 2)
  );

  return res.status(502).json({
    message: "Could not load emails from Resend.",
    details: error.message || error.name || "Unknown Resend error",
  });
}
    return res.json({
      emails: data?.data || [],
      hasMore: data?.has_more || false,
    });
  } catch (error) {
    console.error("Admin emails error:", error.message);

    return res.status(500).json({
      message: "Unable to load admin emails.",
    });
  }
});

// =====================================
// GOOGLE REVIEWS
// =====================================

const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauthClient.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

let reviewsCache = null;
let reviewsCacheExpiry = 0;

app.get("/api/google-reviews", async (req, res) => {
  const required = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REFRESH_TOKEN",
    "GBP_ACCOUNT_ID",
    "GBP_LOCATION_ID",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    return res.status(503).json({
      error: "Google reviews are not configured yet.",
      missing,
    });
  }

  if (reviewsCache && Date.now() < reviewsCacheExpiry) {
    return res.json(reviewsCache);
  }

  try {
    const parent =
      `accounts/${process.env.GBP_ACCOUNT_ID}` +
      `/locations/${process.env.GBP_LOCATION_ID}`;

    const response = await oauthClient.request({
      url: `https://mybusiness.googleapis.com/v4/${parent}/reviews`,
      method: "GET",
      params: {
        pageSize: 50,
        orderBy: "updateTime desc",
      },
    });

    const data = response.data;

    const reviews = (data.reviews || []).map((review) => ({
      reviewId: review.reviewId || review.name,
      reviewerName:
        review.reviewer?.displayName || "Google customer",
      starRating: convertRating(review.starRating),
      comment: review.comment || "",
      createTime: review.createTime || null,
      updateTime: review.updateTime || null,
    }));

    reviewsCache = {
      averageRating: data.averageRating ?? null,
      totalReviewCount: data.totalReviewCount ?? reviews.length,
      reviews,
      reviewUrl: process.env.GOOGLE_REVIEW_URL || "",
    };

    reviewsCacheExpiry = Date.now() + 10 * 60 * 1000;

    return res.json(reviewsCache);
  } catch (error) {
    console.error(
      "Google Reviews API error:",
      error.response?.data || error.message
    );

    return res.status(502).json({
      error: "Google could not return the reviews. Check server logs.",
    });
  }
});

// =====================================
// HEALTH CHECK
// =====================================

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PRO Vistaar backend running on port ${PORT}`);
});