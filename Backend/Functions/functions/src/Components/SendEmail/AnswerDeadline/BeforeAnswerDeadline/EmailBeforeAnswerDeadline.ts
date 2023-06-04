import { getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions/v1";
import { getSettings } from "../../../../Modules/Functions/GetOrganizationsSpecificDoc";
import { Answer, AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { Question, QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { Email, EmailMessage, UrlAttachments } from "../../../../Modules/Interfaces/Email";
import { v4 as uuidv4 } from "uuid";
import { getAnswerDeadlineDate } from "../../../../Modules/Functions/DateConverters";
import { sendEmailAuthors } from "../../SendEmail";
import { htmlAnswerBeforeDeadline } from "../../../../Modules/Functions/HtmlTemplates/HtmlAnswerBeforeDeadline";
const db = getFirestore();

interface AnswerOverDeadlineInfo {
  question: Question | QuestionWithId;
  answer: Answer | AnswerWithId;
  author: UserCustomInfo;
}

const createAnswerBeforeDeadlineEmail = async (info: AnswerOverDeadlineInfo): Promise<Email> => {
  const fileExists: boolean = (info.answer.fileUrl!=='');
  
  const message: EmailMessage = {
    subject: "Rok za oddajo se bliža",
    html: htmlAnswerBeforeDeadline(info.question, info.answer, info.author, fileExists)
  };

  const email: Email = {
    to: info.author.email,
    message: message,
    headers: {
      "Message-ID": `<${uuidv4()}@gmail.com>`,
    }
  };

  if(fileExists)
  {
    const attachments: UrlAttachments[] = [{
      filename: "Trenutno oddan odgovor.docx",
      path: info.answer.fileUrl
    }];
    
    message.attachments = attachments;
  }

  return email;
}

const isWithinOneDay = (date1: Date, date2: Date): boolean => {
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const oneDayAndHalfInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

  return timeDifference <= oneDayAndHalfInMilliseconds;
}


export const emailBeforeAnswerDeadline = async (daysBeforeDeadline: number): Promise<void> => {
  try {
    const settings = await getSettings();
    const isAutoSendAuthorsOn = settings.autoSendAuthors;
    if(isAutoSendAuthorsOn !== true)
    {
      logger.warn('emailBeforeAnswerDeadline: autoSendAuthors setting is off - function ends without doing anything')
      return;
    }


    const answerDocs = await db.collection('Answers').get();
    const answers: AnswerWithId[] = answerDocs.docs.map((doc): AnswerWithId => {
      const answer: AnswerWithId = {
        id: doc.id,
        questionId: doc.data().questionId,
        authorUid: doc.data().authorUid,
        authorAssigned: doc.data().authorAssigned,
        tags: doc.data().tags,
        answered: doc.data().answered,
        responses: doc.data().responses,
        published: doc.data().published,
        fileUrl: doc.data().fileUrl
      };
      return answer;
    });

    const answersBeforeDeadline = answers.filter((answer) => {
      if(!answer.authorAssigned)
        return false;

      if(!answer.authorUid)
        return false;

      const nowBefore = new Date();
      nowBefore.setDate(nowBefore.getDate()+daysBeforeDeadline);
      const lastMidnightBefore = new Date(nowBefore.getFullYear(), nowBefore.getMonth(), nowBefore.getDate());
      
      if(lastMidnightBefore.getTime() < getAnswerDeadlineDate(answer.authorAssigned.toDate()).getTime())
        return false;
      
      if(!isWithinOneDay(nowBefore, getAnswerDeadlineDate(answer.authorAssigned.toDate())))
        return false;

      return true;
    });


    const userDocs = await db.collection('Users').get();
    const authors: UserCustomInfo[] = userDocs.docs.map((doc): UserCustomInfo => {
      const author: UserCustomInfo = {
        fullName: doc.data().fullName,
        academicTitle: doc.data().academicTitle,
        email: doc.data().email,
        group: doc.data().group,
        lawFields: doc.data().lawFields,
        inactive: doc.data().inactive,
        uid: doc.data().uid
      };
      return author;
    });

    const authorsIdsBeforeDeadline: string[] = answersBeforeDeadline.map((answer): string => (answer.authorUid ?? ''));
    const authorsBeforeDeadline = authors.filter((author) => (authorsIdsBeforeDeadline.includes(author.uid)));

    const questionDocs = await db.collection('Questions').get();
    const questions: QuestionWithId[] = questionDocs.docs.map((doc): QuestionWithId => {
      const question: QuestionWithId = {
        id: doc.id,
        customerEmail: doc.data().customerEmail,
        description: doc.data().description,
        relatesToQuestionId: doc.data().relatesToQuestionId,
        lawFields: doc.data().lawFields,
        created: doc.data().created,
        closed: doc.data().closed
      };
      return question;
    });

    for(let i=0; i<answersBeforeDeadline.length; i++) {
      const answer: AnswerWithId = answersBeforeDeadline[i];
      const question: QuestionWithId|undefined = questions.find((question) => (question.id === answer.questionId));
      if(!question)
        continue;
      
      const author: UserCustomInfo|undefined = authorsBeforeDeadline.find((author) => (author.uid === answer.authorUid));
      if(!author)
        continue;

      const emailInfo: AnswerOverDeadlineInfo = {
        question: question,
        answer: answer,
        author: author
      };

      const email = await createAnswerBeforeDeadlineEmail(emailInfo);
      await sendEmailAuthors(email);
    }
  } catch (error) {
    logger.error(error);
  }
}
