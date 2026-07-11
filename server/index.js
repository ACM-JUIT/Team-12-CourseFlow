require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.log("❌ MongoDB Error:", err);
    });

app.get("/", (req, res) => {
    res.send("CourseFlow Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});