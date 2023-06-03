import { logger } from "firebase-functions";
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { answerResponseOrganizationDocId } from "../../../../Config/OrganizationDocuments";
import isEqual = require('lodash/isEqual');
import { emailAnswerResponse } from "../EmailAnswerResonse";

const isPossibleInfiniteLoopForThisFunction = (data: FirebaseFirestore.DocumentData|undefined, previousData: FirebaseFirestore.DocumentData|undefined): boolean => {
  if(!data)
    return true;
  if(isEqual(data, previousData))
    return true;
  if(data.answerId===previousData?.answerId && data.lastResponse===previousData?.lastResponse)
    return true;

  return false;
}

export const sendEmailOnUpdatedAnswerResponse = onDocumentUpdated("Organizations/"+answerResponseOrganizationDocId, async (event) => {
  try {
    const data = event.data?.after.data();
    const previousData = event.data?.before.data();
    if(isPossibleInfiniteLoopForThisFunction(data, previousData)) //This is safeguard for infinite loops (Firebase Function calls cost money)
      return;
    
    await emailAnswerResponse(data);
  } catch(error) {
    logger.error(error);
  }
});
