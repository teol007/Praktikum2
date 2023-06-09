import { logger } from "firebase-functions";
import { Timestamp, getFirestore } from 'firebase-admin/firestore';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { Email, EmailMessage, UrlAttachments } from "../../../Modules/Interfaces/Email";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { PublishOrganizationDoc } from "../../../Modules/Interfaces/OrganizationsDocs";
import { sendEmailAnswer } from "../SendEmail";
import { htmlAnswer } from "../../../Modules/Functions/HtmlTemplates/HtmlAnswer";
import { publishOrganizationDocId } from "../../../Config/OrganizationDocuments";
import { v4 as uuidv4 } from "uuid";
const db = getFirestore();

const createAnswerEmail = async (question: QuestionWithId, answer: AnswerWithId): Promise<Email|null> => {
  if(answer.fileUrl === '')
    return null;

  const attachments: UrlAttachments[] = [{
    filename: "Pravni odgovor.docx",
    path: answer.fileUrl
  }];

  const message: EmailMessage = {
    subject: "Odgovor na vaše pravno vprašanje",
    html: htmlAnswer(question, answer),
    attachments: attachments
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

export const sendEmailOnCreatePublishAnswer = onDocumentCreated("Organizations/"+publishOrganizationDocId, async (event) => {
  try {
    const data = event.data?.data();

    if(!data)
    {
      const newData: PublishOrganizationDoc = {
        lastPublishedAnswerId: ""
      };
      db.collection('Organizations').doc(publishOrganizationDocId).update({...newData});
      return;
    }

    const published: PublishOrganizationDoc = {
      lastPublishedAnswerId: data.lastPublishedAnswerId
    };

    const answerDoc = await db.collection('Answers').doc(published.lastPublishedAnswerId).get();
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

    const email = await createAnswerEmail(question, answer);
    if(!email)
      return;

      const isSuccessful = await sendEmailAnswer(email);
      if(!isSuccessful)
      {
        logger.error('sendEmailOnCreatePublishAnswer: autoSendAnswers setting is off - function ends without doing anything')
        return;
      }
  
      db.collection('Questions').doc(answer.questionId).update({closed: true});
      db.collection('Answers').doc(answer.id).update({published: Timestamp.now()});

  } catch(error) {
    logger.error(error);
  }
});