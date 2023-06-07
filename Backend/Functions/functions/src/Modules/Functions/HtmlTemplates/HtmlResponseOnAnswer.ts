import { frontendHostingUrlLoginPage } from "../../../Config/FrontendHostingConf";
import { Answer, AnswerWithId, Response, Status } from "../../Interfaces/Answer";
import { Question, QuestionWithId } from "../../Interfaces/Question";
import { UserCustomInfo } from "../../Interfaces/UserCustomInfo";
import { toSlovenianDateTimePlusTimezoneDifference } from "../DateConverters";

const mnenjeHtml = (status: Status): string => {
  let text: string = 'Neopredeljeno';
  let color: string = 'white';
  switch (status) {
    case Status.Good: text = 'Se strinjam'; color = 'green'; break;
    case Status.Bad: text = 'Ne strinjam se'; color = 'yellow'; break;
    case Status.VeryBad: text = 'Močno se ne strinjam'; color = 'red'; break;
    default: text = 'grey';
  }
  return `<span style="color: ${color};">${text}</span>`;
}

export const htmlResponseOnAnswer = (question: Question|QuestionWithId, answer: Answer|AnswerWithId, answerAuthor: UserCustomInfo, commenter: UserCustomInfo, response: Response, isFileAttached: boolean): string => {
  const htmlTemplate = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .footer {
          margin-top: 5px;
        }
        .email-container {
          background-color: #fff;
          border-color: grey;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .question-description {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .normalText {
          margin-bottom: 10px;
        }
        .law-fields {
          margin-bottom: 10px;
        }
        .assigned-info {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <p class="normalText">Pozdravljeni,<br /><br />dobili ste nov komentar na vaš odgovor.</p>
        <hr />
        <h2>Nov odziv</h2>
        <p class="question-description"><strong>Mnenje: </strong> ${mnenjeHtml(response.status)}</p>
        ${response.description!=='' ? `<p class="question-description"><strong>Komentar:</strong> ${response.description}</p>` : ''}
        <div class="assigned-info">
          <p><strong>Odziv podal:</strong> ${commenter.academicTitle+' '+commenter.fullName}</p>
          <p><strong>Datum:</strong> ${toSlovenianDateTimePlusTimezoneDifference(response.created.toDate())}</p>
          ${isFileAttached ? '<p>V priponki je stanje vašega oddanega odgovora ob odzivu</p>' : ''}
        </div>
        <hr />
        <h2>Podrobnosti odgovora</h2>
        <p class="question-description"><strong>Vprašanje:</strong> ${question.description}</p>
        <p class="law-fields"><strong>Pravna področja:</strong> ${question.lawFields.join(", ").toLowerCase()}</p>
        <p class="law-fields"><strong>Oznake:</strong> ${answer.tags.length<=0 ? '/' : answer.tags.join(", ").toLowerCase()}</p>
        <div class="assigned-info">
          <p><strong>Dodeljena oseba za odgovor:</strong> ${answerAuthor.academicTitle+' '+answerAuthor.fullName}</p>
          <p><strong>Datum dodelitve:</strong> ${answer.authorAssigned ? toSlovenianDateTimePlusTimezoneDifference(answer.authorAssigned.toDate()) : '<i>Ni navedeno</i>'}</p>
        </div>
        <p class="law-fields"><strong>Število odzivov:</strong> ${answer.responses.length}</p>
        <p class="law-fields">Link do spletne strani: <a href="${frontendHostingUrlLoginPage}">Pravo za vse</a></p>
        <hr />
        <br />
        <p class="footer normalText">Lep pozdrav<br />ekipa spletnega portala Pravo za VSE</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}
