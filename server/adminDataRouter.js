
import express from "express";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

function db() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env"
    );
  }

  if (!url.startsWith("https://") || !url.includes(".supabase.co")) {
    throw new Error(
      "SUPABASE_URL looks incorrect. Copy the actual Project URL from Supabase."
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : "";

  if (!token || !process.env.JWT_SECRET) {
    return res.status(401).json({
      message: "Please log in to access admin records.",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (
      user.role !== "admin" ||
      user.email !== (process.env.ADMIN_EMAIL || "").trim().toLowerCase()
    ) {
      return res.status(403).json({
        message: "Admin access denied.",
      });
    }

    next();
  } catch {
    return res.status(401).json({
      message: "Session expired. Please log in again.",
    });
  }
}

function logError(label, error) {
  console.error(`${label}:`, error);
  if (error?.cause) {
    console.error(`${label} cause:`, error.cause);
  }
}

router.use("/records", requireAdmin);

// GET: Load records
router.get("/records", async (_req, res) => {
  try {
    const { data, error } = await db()
      .from("admin_records")
      .select("id,kind,data,created_at,updated_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    return res.json({ records: data || [] });
  } catch (error) {
    logError("Records list FULL ERROR", error);

    return res.status(500).json({
      message: "Could not load hosted records. Check backend terminal.",
    });
  }
});

// POST: Create record
router.post("/records", async (req, res) => {
  try {
    const { kind, data } = req.body || {};

    if (
      !["customer", "enquiry", "project", "payment"].includes(kind) ||
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      return res.status(400).json({
        message: "Provide a valid record type and data.",
      });
    }

    const { data: row, error } = await db()
      .from("admin_records")
      .insert({ kind, data })
      .select("id,kind,data,created_at,updated_at")
      .single();

    if (error) throw error;

    return res.status(201).json({ record: row });
  } catch (error) {
    logError("Records create FULL ERROR", error);

    return res.status(500).json({
      message: "Could not save hosted record.",
    });
  }
});

// PATCH: Update record
router.patch("/records/:id", async (req, res) => {
  try {
    const { data } = req.body || {};

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      return res.status(400).json({
        message: "Provide valid record data.",
      });
    }

    const { data: row, error } = await db()
      .from("admin_records")
      .update({
        data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", req.params.id)
      .select("id,kind,data,created_at,updated_at")
      .maybeSingle();

    if (error) throw error;

    if (!row) {
      return res.status(404).json({
        message: "Record not found.",
      });
    }

    return res.json({ record: row });
  } catch (error) {
    logError("Records update FULL ERROR", error);

    return res.status(500).json({
      message: "Could not update hosted record.",
    });
  }
});

// DELETE: Remove record
router.delete("/records/:id", async (req, res) => {
  try {
    const { data, error } = await db()
      .from("admin_records")
      .delete()
      .eq("id", req.params.id)
      .select("id")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        message: "Record not found.",
      });
    }

    return res.json({ success: true });
  } catch (error) {
    logError("Records delete FULL ERROR", error);

    return res.status(500).json({
      message: "Could not delete hosted record.",
    });
  }
});

export default router;
