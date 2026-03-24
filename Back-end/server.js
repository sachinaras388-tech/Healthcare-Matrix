const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/records", require("./Routes/recordRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));

