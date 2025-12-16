const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "dev_webhook_verify_token";

/**
 * GET /api/ig/callback
 * Verify webhook endpoint for Instagram
 * Instagram sends a GET request with mode, token, and challenge to verify the webhook URL
 */
const verifyWebhook = asyncHandler(async (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (!mode || !token) {
        throw ApiError.badRequest("Missing required query parameters");
    }

    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
    } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        throw ApiError.forbidden("Webhook verification failed");
    }
});

/**
 * POST /api/ig/callback
 * Receive webhook events from Instagram
 * Handles incoming webhook events from Instagram's Graph API
 */
const handleWebhookCallback = asyncHandler(async (req, res) => {
    const body = req.body;

    // Check if this is an event from Instagram
    if (body.object === "instagram") {
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach((entry) => {
            // Get the webhook event. entry.messaging is the relevant data for messenger platform
            const webhook_event = entry.messaging;

            if (webhook_event) {
                webhook_event.forEach((event) => {
                    console.log("Webhook event received:", JSON.stringify(event, null, 2));

                    // Handle different event types
                    if (event.message) {
                        handleMessage(event);
                    } else if (event.postback) {
                        handlePostback(event);
                    } else if (event.read) {
                        console.log("Message read event");
                    } else if (event.delivery) {
                        console.log("Message delivered");
                    } else {
                        console.log("Webhook event received:", event);
                    }
                });
            }

            // Handle Instagram Story Mentions
            const ig_webhook_event = entry.changes;
            if (ig_webhook_event) {
                ig_webhook_event.forEach((change) => {
                    console.log("Instagram webhook event:", JSON.stringify(change, null, 2));

                    if (change.field === "story_insights") {
                        console.log("Story insights event");
                    } else if (change.field === "comments") {
                        console.log("Comments event");
                    } else if (change.field === "messages") {
                        console.log("Direct messages event");
                    }
                });
            }
        });

        // Return a '200 OK' response to all incoming webhook requests
        res.status(200).json({ status: "event received and processed" });
    } else {
        // Return '404 Not Found' if event is not from Instagram
        throw ApiError.notFound("Webhook object is not from Instagram");
    }
});

/**
 * Handle incoming messages from Instagram
 */
const handleMessage = (event) => {
    const sender_psid = event.sender.id;
    const recipient_id = event.recipient.id;
    const message = event.message;

    console.log(`Message from ${sender_psid}: ${JSON.stringify(message)}`);

    // Check if the message contains text
    if (message.text) {
        console.log(`Text message: ${message.text}`);
        // Handle text message logic here
    }

    // Check if the message has attachments
    if (message.attachments) {
        console.log(`Message has ${message.attachments.length} attachment(s)`);
        // Handle attachment logic here
    }
};

/**
 * Handle postback events from Instagram buttons/quick replies
 */
const handlePostback = (event) => {
    const sender_psid = event.sender.id;
    const payload = event.postback.payload;

    console.log(`Postback from ${sender_psid}: ${payload}`);
    // Handle postback logic here
};

module.exports = {
    verifyWebhook,
    handleWebhookCallback,
};
