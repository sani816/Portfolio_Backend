const express = require("express");
const cors = require("cors");
const supabase = require("./supabaseClient");
require("dotenv").config();

const app = express();

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route (IMPORTANT FOR VERCEL)
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Backend running on Vercel 🚀" });
});

// Contact route
app.post("/api/contact", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const { data, error } = await supabase
      .from("contactss")
      .insert([{ name, email, message }]);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Message Saved Successfully"
    });

  } catch (err) {
    console.error("Supabase error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// 🚫 DO NOT USE app.listen() ON VERCEL
module.exports = app;
