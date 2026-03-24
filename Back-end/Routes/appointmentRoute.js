const express = require("express");
const router = express.Router();

const Appointment = require("../Models/appointment");
const protect = require("../middleware/authMiddleware");

// ✅ Correct usage
router.post("/book", protect, async (req, res) => {
  const appointment = await Appointment.create({
    userId: req.user.id,
    doctorName: req.body.doctorName,
    date: req.body.date,
    time: req.body.time,
    reason: req.body.reason
  });

  res.json(appointment);
});

module.exports = router;
