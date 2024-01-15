/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getApiKey1 = onRequest({cors: true}, (request, response) => {
  response.json({key: "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"});
});

export const getApiKey2 = onRequest({cors: true}, (request, response) => {
  response.json({key: "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"});
});

