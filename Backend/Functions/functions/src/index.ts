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

import { sendEmailOnCreateAnswer } from "./Components/SendEmail/OnCreateAnswer/SendEmailOnCreateAnswer";
import { sendEmailOnPublishAnswer } from "./Components/SendEmail/OnPublishAnswer/SendEmailOnPublishAnswer";
import { sendEmailOnCreatePublishAnswer } from "./Components/SendEmail/OnPublishAnswer/SendEmailOnCreatePublishAnswer";
import { onCreateQuestion } from "./Components/OnCreateQuestion/OnCreateQuestion";
import { sendEmailOnCreatedReassignedAnswerAuthor } from "./Components/SendEmail/OnReassignedAnswerAuthor/SendEmailOnCreatedReassignedAnswerAuthor";
import { sendEmailOnUpdatedReassignedAnswerAuthor } from "./Components/SendEmail/OnReassignedAnswerAuthor/SendEmailOnUpdatedReassignedAnswerAuthor";
import { sendEmailOnUpdatedAnswerResponse } from "./Components/SendEmail/OnAnswerResponse/OnEvent/SendEmailOnUpdatedAnswerResponse";
import { sendEmailOnCreatedAnswerResponse } from "./Components/SendEmail/OnAnswerResponse/OnEvent/SendEmailOnCreatedAnswerResponse";

exports.onCreateQuestion = onCreateQuestion;
exports.sendEmailOnCreateAnswer = sendEmailOnCreateAnswer;
exports.sendEmailOnCreatedReassignedAnswerAuthor = sendEmailOnCreatedReassignedAnswerAuthor;
exports.sendEmailOnUpdatedReassignedAnswerAuthor = sendEmailOnUpdatedReassignedAnswerAuthor;
exports.sendEmailOnCreatedAnswerResponse = sendEmailOnCreatedAnswerResponse;
exports.sendEmailOnUpdatedAnswerResponse = sendEmailOnUpdatedAnswerResponse;
exports.sendEmailOnCreatePublishAnswer = sendEmailOnCreatePublishAnswer;
exports.sendEmailOnPublishAnswer = sendEmailOnPublishAnswer;
