/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/* 
import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore"; 
*/

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
initializeApp();


// import { getFirestore } from "firebase-admin/firestore";

import { autoAssignQuestions } from "./Components/AutoAssignQuestions";

exports.autoAssignQuestions = autoAssignQuestions;
