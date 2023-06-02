import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { autoAssignQuestions } from "../AutoAssignQuestions/AutoAssignQuestions";
import { sendEmailQuestionReceived } from "../SendEmail/SendEmailQuestionReceived/SendEmailQuestionReceived";


export const onCreateQuestion = onDocumentCreated("Questions/{questionId}", (event) => {
    autoAssignQuestions(event);
    sendEmailQuestionReceived(event);
});