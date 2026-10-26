import express from "express";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
function db() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase is not configured on the backend.");
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
}
function requireAdmin(req,res,next){
  const h=req.headers.authorization||"", token=h.startsWith("Bearer ")?h.slice(7):"";
  if(!token||!process.env.JWT_SECRET)return res.status(401).json({message:"Please log in to access admin records."});
  try {
    const user=jwt.verify(token,process.env.JWT_SECRET);
    if(user.role!=="admin"||user.email!==(process.env.ADMIN_EMAIL||"").toLowerCase())return res.status(403).json({message:"Admin access denied."});
    next();
  } catch { return res.status(401).json({message:"Session expired. Please log in again."}); }
}
router.use("/records", requireAdmin);
router.get("/records",async(_req,res)=>{try{const {data,error}=await db().from("admin_records").select("id,kind,data,created_at,updated_at").order("created_at",{ascending:false}).limit(1000);if(error)throw error;res.json({records:data||[]})}catch(e){console.error("Records list:",e.message);res.status(500).json({message:"Could not load hosted records. Check Supabase setup."})}});
router.post("/records",async(req,res)=>{try{const {kind,data}=req.body||{};if(!["customer","enquiry","project","payment"].includes(kind)||!data||typeof data!=="object"||Array.isArray(data))return res.status(400).json({message:"Provide a valid record type and data."});const {data:row,error}=await db().from("admin_records").insert({kind,data}).select("id,kind,data,created_at,updated_at").single();if(error)throw error;res.status(201).json({record:row})}catch(e){console.error("Records create:",e.message);res.status(500).json({message:"Could not save hosted record."})}});
router.patch("/records/:id",async(req,res)=>{try{const {data}=req.body||{};if(!data||typeof data!=="object"||Array.isArray(data))return res.status(400).json({message:"Provide valid record data."});const {data:row,error}=await db().from("admin_records").update({data,updated_at:new Date().toISOString()}).eq("id",req.params.id).select("id,kind,data,created_at,updated_at").maybeSingle();if(error)throw error;if(!row)return res.status(404).json({message:"Record not found."});res.json({record:row})}catch(e){console.error("Records update:",e.message);res.status(500).json({message:"Could not update hosted record."})}});
router.delete("/records/:id",async(req,res)=>{try{const {data,error}=await db().from("admin_records").delete().eq("id",req.params.id).select("id").maybeSingle();if(error)throw error;if(!data)return res.status(404).json({message:"Record not found."});res.json({success:true})}catch(e){console.error("Records delete:",e.message);res.status(500).json({message:"Could not delete hosted record."})}});
export default router;
