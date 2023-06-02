import { logger } from "firebase-functions";
import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { Email, EmailMessage } from "../../../Modules/Interfaces/Email";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { htmlQuestionAssigned } from "../../../Modules/Functions/HtmlTemplates/HtmlQuestionAssigned";
import { sendEmailAuthors } from "../SendEmail";
import { v4 as uuidv4 } from "uuid";
const db = getFirestore();

const createEmail = async (user: UserCustomInfo, answer: AnswerWithId): Promise<Email|null> => {
  const questionDoc = await db.collection('Questions').doc(answer.questionId).get();
  if(!questionDoc.exists)
    return null;

  const questionData = questionDoc.data();
  if(!questionData)
    return null;
  
  const question: QuestionWithId = {
    id: questionDoc.id,
    customerEmail: questionData.customerEmail,
    description: questionData.description,
    relatesToQuestionId: questionData.relatesToQuestionId,
    lawFields: questionData.lawFields,
    created: questionData.created,
    closed: questionData.closed
  };

  const message: EmailMessage = {
    subject: "Dodeljeno novo vprašanje",
    html: htmlQuestionAssigned(question.description, question.lawFields, user.academicTitle+' '+user.fullName, answer.authorAssigned?.toDate()),
  };

  const email: Email = {
    to: user.email,
    message: message,
    headers: {
      "Message-ID": `<${uuidv4()}@gmail.com>`,
    }
  };

  return email;
}

export const sendEmailOnCreateAnswer = onDocumentCreated("Answers/{answerId}", async (event) => {
  try {
    const createdAnswerSnapshot = event.data;
    if(!createdAnswerSnapshot)
      return;

    const createdAnswer: AnswerWithId = {
      id: createdAnswerSnapshot.id,
      questionId: createdAnswerSnapshot.data().questionId,
      authorUid: createdAnswerSnapshot.data().authorUid,
      authorAssigned: createdAnswerSnapshot.data().authorAssigned,
      tags: createdAnswerSnapshot.data().tags,
      answered: createdAnswerSnapshot.data().answered,
      responses: createdAnswerSnapshot.data().responses,
      published: createdAnswerSnapshot.data().published,
      fileUrl: createdAnswerSnapshot.data().fileUrl
    };

    if(!createdAnswer.authorUid || createdAnswer.authorUid==='')
      return;

    const authorDoc = await db.collection('Users').doc(createdAnswer.authorUid).get();
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
    }

    const email = await createEmail(author, createdAnswer);
    if(!email)
      return;

    await sendEmailAuthors(email);
  } catch(error) {
    logger.error(error);
  }
});