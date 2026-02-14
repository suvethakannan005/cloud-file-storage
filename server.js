const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const fileRoutes = require("./Routes/fileRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("Cloud File Storage Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

