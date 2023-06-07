import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { autoAssignQuestions } from "../AutoAssignQuestions/AutoAssignQuestions";
import { sendEmailQuestionReceived } from "../SendEmail/SendEmailQuestionReceived/SendEmailQuestionReceived";
import { logger } from "firebase-functions/v1";


export const onCreateQuestion = onDocumentCreated("Questions/{questionId}", (event) => {
    try {
      autoAssignQuestions(event);
      sendEmailQuestionReceived(event);
    } catch (error) {
      logger.error(error);
    }
});
