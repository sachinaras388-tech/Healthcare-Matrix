const express = require("express");
const multer = require("multer");
const Record = require("../models/Record");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// File upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Upload record
router.post("/upload", protect, upload.single("file"), async (req, res) => {
  const record = await Record.create({
    userId: req.user.id,
    title: req.body.title,
    category: req.body.category,
    file: req.file.path,
    description: req.body.description
  });

  res.json(record);
});

// Get records
router.get("/", protect, async (req, res) => {
  let records;

  if (req.user.role === "doctor") {
    records = await Record.find();
  } else {
    records = await Record.find({ userId: req.user.id });
  }

  res.json(records);
});

// Search & filter
router.get("/search", protect, async (req, res) => {
  const { category, title } = req.query;

  let query = {};

  if (req.user.role === "patient") {
    query.userId = req.user.id;
  }

  if (category) query.category = category;
  if (title) query.title = { $regex: title, $options: "i" };

  const records = await Record.find(query);
  res.json(records);
});

module.exports = router;
