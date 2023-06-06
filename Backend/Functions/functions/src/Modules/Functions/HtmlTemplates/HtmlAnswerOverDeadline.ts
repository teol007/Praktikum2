import { frontendHostingUrlLoginPage } from "../../../Config/FrontendHostingConf";
import { Answer, AnswerWithId } from "../../Interfaces/Answer";
import { Question, QuestionWithId } from "../../Interfaces/Question";
import { UserCustomInfo } from "../../Interfaces/UserCustomInfo";
import { getAnswerDeadlineDate, toSlovenianDateTime } from "../DateConverters";

export const htmlAnswerOverDeadline = (question: Question|QuestionWithId, answer: Answer|AnswerWithId, author: UserCustomInfo, isFileAttached: boolean): string => {
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
        <p class="normalText">Pozdravljeni,<br /><br />obveščamo vas, da je potekel rok za oddajo odgovora na vprašanje, ki vam je bilo dodeljeno.</p>
        <hr />
        <h2>Podrobnosti</h2>
        <p class="question-description"><strong>Vprašanje:</strong> ${question.description}</p>
        <p class="law-fields"><strong>Rok oddaje:</strong> <span style="color: red;">${answer.authorAssigned ? toSlovenianDateTime(getAnswerDeadlineDate(answer.authorAssigned.toDate())) : '<i>Neznano</i>'}</span></p>
        <div class="assigned-info">
          <p><strong>Dodeljeno osebi:</strong> ${author.academicTitle+' '+author.fullName}</p>
          <p><strong>Datum dodelitve:</strong> ${answer.authorAssigned ? toSlovenianDateTime(answer.authorAssigned.toDate()) : '<i>Ni navedeno</i>'}</p>
          <p>Link do spletne strani: <a href="${frontendHostingUrlLoginPage}">Pravo za vse</a></p>
          ${isFileAttached ? '<p>V priponki je priložena datoteka, ki ste jo oddali.</p>' : ''}
        </div>
        <hr />
        <br />
        <p class="footer normalText">Lep pozdrav<br />ekipa spletnega portala Pravo za VSE</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}