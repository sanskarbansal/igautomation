const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
});

router.get("/health", (req, res) => {
    res.json({ uptime: process.uptime(), message: "Healthy" });
});

// auth routes
router.use("/auth", require("./auth"));

module.exports = router;
