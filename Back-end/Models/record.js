const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  category: {
    type: String,
    enum: ["report", "prescription"]
  },
  file: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);
