import { logger } from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { ReassignedAuthorOrganizationDoc } from "../../../Modules/Interfaces/OrganizationsDocs";
import { sendEmailAuthors } from "../SendEmail";
import { reassignedAuthorOrganizationDocId } from "../../../Config/OrganizationDocuments";
import isEqual = require('lodash/isEqual');
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import { getSettings } from "../../../Modules/Functions/GetOrganizationsSpecificDoc";
import { createLastUserReassignedEmail, createNewUserReassignedEmail } from "./SendEmailReassignedFunctions/emailReassignedFunctions";
const db = getFirestore();

const isPossibleInfiniteLoopForThisFunction = (data: FirebaseFirestore.DocumentData|undefined, previousData: FirebaseFirestore.DocumentData|undefined): boolean => {
  if(!data)
    return true;
  if(isEqual(data, previousData))
    return true;
  if(data.answerId===previousData?.answerId && data.lastAssignedAnswerAuthorUid===previousData?.lastAssignedAnswerAuthorUid && data.newReassignedAnswerAuthorUid===previousData?.newReassignedAnswerAuthorUid)
    return true;

  return false;
}


export const sendEmailOnUpdatedReassignedAnswerAuthor = onDocumentUpdated("Organizations/"+reassignedAuthorOrganizationDocId, async (event) => {
  try {
    const data = event.data?.after.data();
    const previousData = event.data?.before.data();
    if(isPossibleInfiniteLoopForThisFunction(data, previousData)) //This is safeguard for infinite loops (Firebase Function calls cost money)
      return;
    
    if(!data)
      return;

    const reassigned: ReassignedAuthorOrganizationDoc = {
      answerId: data.answerId,
      lastAssignedAnswerAuthorUid: data.lastAssignedAnswerAuthorUid,
      newReassignedAnswerAuthorUid: data.newReassignedAnswerAuthorUid
    };

    if(reassigned.answerId==='' || reassigned.lastAssignedAnswerAuthorUid==='' || reassigned.newReassignedAnswerAuthorUid==='')
      return;

    const settings = await getSettings();
    const isautoSendAuthorsOn = settings.autoSendAuthors;
    if(isautoSendAuthorsOn !== true)
    {
      logger.warn('sendEmailOnReassignedAnswerAuthor: autoSendAuthors setting is off - function ends without doing anything')
      return;
    }

    const answerDoc = await db.collection('Answers').doc(reassigned.answerId).get();
    if(!answerDoc.exists)
      return;

    const answerData = answerDoc.data();
    if(!answerData)
      return;

    const answer: AnswerWithId = {
      id: answerDoc.id,
      questionId: answerData.questionId,
      authorUid: answerData.authorUid,
      authorAssigned: answerData.authorAssigned,
      tags: answerData.tags,
      answered: answerData.answered,
      responses: answerData.responses,
      published: answerData.published,
      fileUrl: answerData.fileUrl
    };

    const questionDoc = await db.collection('Questions').doc(answer.questionId).get();
    if(!questionDoc.exists)
      return;

    const questionData = questionDoc.data();
    if(!questionData)
      return;
    
    const question: QuestionWithId = {
      id: questionDoc.id,
      customerEmail: questionData.customerEmail,
      description: questionData.description,
      relatesToQuestionId: questionData.relatesToQuestionId,
      lawFields: questionData.lawFields,
      created: questionData.created,
      closed: questionData.closed
    };

    const lastUserDoc = await db.collection('Users').doc(reassigned.lastAssignedAnswerAuthorUid).get();
    if(!lastUserDoc.exists)
      return;

    const lastUserData = lastUserDoc.data();
    if(!lastUserData)
      return;
    
    const lastUser: UserCustomInfo = {
      fullName: lastUserData.fullName,
      academicTitle: lastUserData.academicTitle,
      email: lastUserData.email,
      group: lastUserData.group,
      lawFields: lastUserData.lawFields,
      inactive: lastUserData.inactive,
      uid: lastUserData.uid
    };

    const newUserDoc = await db.collection('Users').doc(reassigned.newReassignedAnswerAuthorUid).get();
    if(!newUserDoc.exists)
      return;

    const newUserData = newUserDoc.data();
    if(!newUserData)
      return;
    
    const newUser: UserCustomInfo = {
      fullName: newUserData.fullName,
      academicTitle: newUserData.academicTitle,
      email: newUserData.email,
      group: newUserData.group,
      lawFields: newUserData.lawFields,
      inactive: newUserData.inactive,
      uid: newUserData.uid
    };

    
    const lastUserEmail = await createLastUserReassignedEmail(question, lastUser);
    const newUserEmail = await createNewUserReassignedEmail(question, answer, newUser, new Date());
    await db.collection('Answers').doc(answer.id).update({authorUid: newUser.uid});
    await sendEmailAuthors(newUserEmail);
    await sendEmailAuthors(lastUserEmail);
  } catch(error) {
    logger.error(error);
  }
});