import { htmlLastUserAnswerReassigned } from "../../../../Modules/Functions/HtmlTemplates/HtmlLastUserAnswerReassigned";
import { htmlNewUserAnswerReassigned } from "../../../../Modules/Functions/HtmlTemplates/HtmlNewUserAnswerReassigned";
import { Answer, AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { Email, EmailMessage, UrlAttachments } from "../../../../Modules/Interfaces/Email";
import { Question, QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { v4 as uuidv4 } from "uuid";

export const createLastUserReassignedEmail = async (question: Question|QuestionWithId, lastUser: UserCustomInfo): Promise<Email> => {
  const message: EmailMessage = {
    subject: "Sprememba dodeljene osebe za odgovor na vprašanje",
    html: htmlLastUserAnswerReassigned(question),
  };

  const lastUserEmail: Email = {
    to: lastUser.email,
    message: message,
    headers: {
      "Message-ID": `<${uuidv4()}@gmail.com>`,
    }
  };

  return lastUserEmail;
}

export const createNewUserReassignedEmail = async (question: Question|QuestionWithId, answer: Answer|AnswerWithId, newUser: UserCustomInfo, reassignmentDate: Date): Promise<Email> => {
  const fileExists: boolean = (answer.fileUrl!=='');
  
  const message: EmailMessage = {
    subject: "Predodeljeno novo vprašanje",
    html: htmlNewUserAnswerReassigned(question, newUser.academicTitle+' '+newUser.fullName, reassignmentDate, fileExists),
  };

  const newUserEmail: Email = {
    to: newUser.email,
    message: message,
    headers: {
      "Message-ID": `<${uuidv4()}@gmail.com>`,
    }
  };

  if(fileExists)
  {
    const attachments: UrlAttachments[] = [{
      filename: "(Delni) odgovor.docx",
      path: answer.fileUrl
    }];
    
    message.attachments = attachments;
  }

  return newUserEmail;
}
