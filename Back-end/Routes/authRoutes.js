const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role
  });

  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

// Get all patients (for doctors)
router.get("/patients", require("../middleware/authMiddleware"), require("../middleware/rolemiddleware")("doctor"), async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Generate report
router.get("/report", require("../middleware/authMiddleware"), require("../middleware/rolemiddleware")("doctor"), async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalRecords = await require("../models/Record").countDocuments();
    
    const recordsByCategory = await require("../models/Record").aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const report = {
      totalPatients,
      totalDoctors,
      totalRecords,
      recordsByCategory,
      generatedAt: new Date()
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
