import { logger } from "firebase-functions";
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { answerResponseOrganizationDocId } from "../../../../Config/OrganizationDocuments";
import { emailAnswerResponse } from "../EmailAnswerResonse";

export const sendEmailOnCreatedAnswerResponse = onDocumentCreated("Organizations/"+answerResponseOrganizationDocId, async (event) => {
  try {
    const data = event.data?.data();
    await emailAnswerResponse(data);
  } catch(error) {
    logger.error(error);
  }
});
