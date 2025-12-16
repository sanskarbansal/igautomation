const express = require("express");
const router = express.Router();
const { verifyWebhook, handleWebhookCallback } = require("../controllers/igController");

// GET /api/ig/callback - Verify webhook URL with Instagram
router.get("/callback", verifyWebhook);

// POST /api/ig/callback - Receive webhook events from Instagram
router.post("/callback", handleWebhookCallback);
// router.post("/callback", handleWebhookCallback);

router.get;
module.exports = router;
