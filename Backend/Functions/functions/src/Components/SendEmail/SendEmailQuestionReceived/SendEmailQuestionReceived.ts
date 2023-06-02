import { logger } from "firebase-functions";
import { FirestoreEvent, QueryDocumentSnapshot } from "firebase-functions/v2/firestore";
import { getSettings } from "../../../Modules/Functions/GetOrganizationsSpecificDoc";
import { Email, EmailMessage } from "../../../Modules/Interfaces/Email";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { htmlQuestionReceived } from "../../../Modules/Functions/HtmlTemplates/HtmlQuestionReceived";
import { getFirestore } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from "uuid";
const db = getFirestore();

const createQuestionReceivedEmail = async (question: QuestionWithId): Promise<Email|null> => {  
	const message: EmailMessage = {
	  subject: "Prejem pravnega vprašanja",
	  html: htmlQuestionReceived(question)
	};
  
	const email: Email = {
	  to: question.customerEmail,
	  message: message,
	  headers: {
		"Message-ID": `<${uuidv4()}@gmail.com>`,
	  }
	};
  
	return email;
}

/**
 * Automatically sends confirmation email that question has been received by us.
 * Works only if autoSendQuestionReceived===true in document inside "Questions" collection with id specified in "config/organizationDocumentId.ts".
 */
export const sendEmailQuestionReceived = async (event: FirestoreEvent<QueryDocumentSnapshot | undefined, {questionId: string}>) => {
  try {
	  const questionSnapshot = event.data;
    if (!questionSnapshot) {
      logger.warn("sendEmailQuestionReceived: No data associated with the event");
      return;
    }

    const settings = await getSettings();
    if(settings.autoSendQuestionReceived !== true)
      return;

	  const question: QuestionWithId = {
	  	id: questionSnapshot.id,
	  	customerEmail: questionSnapshot.data().customerEmail,
	  	description: questionSnapshot.data().description,
	  	relatesToQuestionId: questionSnapshot.data().relatesToQuestionId,
	  	lawFields: questionSnapshot.data().lawFields,
	  	created: questionSnapshot.data().created,
	  	closed: questionSnapshot.data().closed
	  }

	  const email = await createQuestionReceivedEmail(question);
    if(email)
      await db.collection('AutoEmails').add(email);
    
	} catch(error) {
		logger.error(error);
	}
};
