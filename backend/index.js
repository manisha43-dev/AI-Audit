const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const auditRoutes = require("./routes/audit");

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.CLIENT_URL,
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}))

app.use(express.json());

// Routes

app.use("/api/audit", auditRoutes);

// Health check
app.get("/", (req, res) => res.json({ status: "API running ✅" }))

// Connect DB and start
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on Port ${process.env.PORT || 5000}`);

    })

})
    .catch((err) => console.error("DB connection failed:", err))