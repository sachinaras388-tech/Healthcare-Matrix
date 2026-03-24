const express = require("express");
const multer = require("multer");
const Record = require("../Models/record");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// File storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload Record
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

// Get Records
router.get("/", protect, async (req, res) => {
  const records = await Record.find({ userId: req.user.id });
  res.json(records);
});

// Search / Filter
router.get("/search", protect, async (req, res) => {
  const { category } = req.query;

  const records = await Record.find({
    userId: req.user.id,
    category
  });

  res.json(records);
});

module.exports = router;
