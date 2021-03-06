"use strict";

/** 
 * Import Packages
 */
const server = require("express")();
const bot_express = require("bot-express");
const functions = require('firebase-functions');

const app = server();
app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
});
exports.app = functions.https.onRequest(app);

/** 
 * Middleware Configuration
 */
server.listen(process.env.PORT || 5000, () => {
    console.log("server is running...");
});

/** 
 * Mount bot-express
 */
server.use("/bot/webhook", bot_express({
    language: "ja",
    messenger: {
        line: {
            channel_id: process.env.LINE_CHANNEL_ID,
            channel_secret: process.env.LINE_CHANNEL_SECRET
        }
    },
    nlu: {
        type: "dialogflow",
        options: {
            project_id: process.env.GOOGLE_PROJECT_ID,
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
            language: "ja"
        }
    },
    parser: [{
        type: "dialogflow",
        options: {
            project_id: process.env.GOOGLE_PROJECT_ID,
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
            language: "ja"
        }
    }],
    memory: {
        type: "memory-cache", // memory-cache | redis
        retention: Number(process.env.MEMORY_RETENTION)
    },
    translator: {
        type: "google",
        enable_lang_detection: false,
        enable_translation: false,
        options: {
            project_id: process.env.GOOGLE_PROJECT_ID,
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        }
    },
    logger: {
        type: "stdout", // stdout | firestore
        options: { // Options for firestore.
            project_id: process.env.FIREBASE_PROJECT_ID,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: process.env.FIREBASE_PRIVATE_KEY,
        }
    },
    skill: {
        default: process.env.DEFAULT_SKILL
    }
}));

module.exports = server;
