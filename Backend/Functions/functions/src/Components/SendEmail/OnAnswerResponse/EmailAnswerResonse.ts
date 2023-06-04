import { logger } from "firebase-functions/v1"
import { AnswerResponseOrganizationDoc } from "../../../Modules/Interfaces/OrganizationsDocs";
import { getSettings } from "../../../Modules/Functions/GetOrganizationsSpecificDoc";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { AnswerWithId, Response } from "../../../Modules/Interfaces/Answer";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import { Email, EmailMessage, UrlAttachments } from "../../../Modules/Interfaces/Email";
import { v4 as uuidv4 } from "uuid";
import { htmlResponseOnAnswer } from "../../../Modules/Functions/HtmlTemplates/HtmlResponseOnAnswer";
import { sendEmailAuthors } from "../SendEmail";
const db = getFirestore();


const createResponseOnAnswerEmail = async (question: QuestionWithId, answer: AnswerWithId, answerAuthor: UserCustomInfo, commenter: UserCustomInfo, response: Response): Promise<Email> => {
  const fileExists: boolean = (answer.fileUrl!=='');
  
  const message: EmailMessage = {
    subject: "Nov odziv na oddan odgovor",
    html: htmlResponseOnAnswer(question, answer, answerAuthor, commenter, response, fileExists)
  };

  const email: Email = {
    to: answerAuthor.email,
    message: message,
    headers: {
      "Message-ID": `<${uuidv4()}@gmail.com>`,
    }
  };

  if(fileExists)
  {
    const attachments: UrlAttachments[] = [{
      filename: "Trenutno oddan odgovor.docx",
      path: answer.fileUrl
    }];
    
    message.attachments = attachments;
  }

  return email;
}

const isEqualResponse = (response1: Response, response2: Response): boolean => {
  if(response1.commenterUid !== response2.commenterUid)
    return false;
  if(response1.description !== response2.description)
    return false;
  if(response1.status !== response2.status)
    return false;
  if(!(response1.created.seconds-60<response2.created.seconds && response1.created.seconds+60>response2.created.seconds))  //If there is the same response in 2 minute time period, then it is the same one
    return false;
  return true;
}


export const emailAnswerResponse = async (data: FirebaseFirestore.DocumentData|undefined): Promise<void> => {
  try {
    if(!data)
      return;

    const answerResponse: AnswerResponseOrganizationDoc = {
      answerId: data.answerId,
      lastResponse: data.lastResponse
    };

    if(answerResponse.answerId === '')
      return;

    const settings = await getSettings();
    const isAutoSendAuthorsOn = settings.autoSendAuthors;
    if(isAutoSendAuthorsOn !== true)
    {
      logger.warn('emailAnswerResponse: autoSendAuthors setting is off - function ends without doing anything')
      return;
    }

    const answerDoc = await db.collection('Answers').doc(answerResponse.answerId).get();
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

    if(!answer.authorUid)
      return;

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

    const commenterDoc = await db.collection('Users').doc(answerResponse.lastResponse.commenterUid).get();
    if(!commenterDoc.exists)
      return;

    const commenterData = commenterDoc.data();
    if(!commenterData)
      return;
    
    const commenter: UserCustomInfo = {
      fullName: commenterData.fullName,
      academicTitle: commenterData.academicTitle,
      email: commenterData.email,
      group: commenterData.group,
      lawFields: commenterData.lawFields,
      inactive: commenterData.inactive,
      uid: commenterData.uid
    };

    const authorDoc = await db.collection('Users').doc(answer.authorUid).get();
    if(!authorDoc.exists)
      return;

    const authorData = authorDoc.data();
    if(!authorData)
      return;
    
    const author: UserCustomInfo = {
      fullName: authorData.fullName,
      academicTitle: authorData.academicTitle,
      email: authorData.email,
      group: authorData.group,
      lawFields: authorData.lawFields,
      inactive: authorData.inactive,
      uid: authorData.uid
    };

    
    const email = await createResponseOnAnswerEmail(question, answer, author, commenter, answerResponse.lastResponse);
    if(!answer.responses.some((r) => (isEqualResponse(r, answerResponse.lastResponse))))
      await db.collection('Answers').doc(answerResponse.answerId).update({responses: FieldValue.arrayUnion(answerResponse.lastResponse)});

    await sendEmailAuthors(email);
  } catch (error) {
    logger.error(error);
  }
}
