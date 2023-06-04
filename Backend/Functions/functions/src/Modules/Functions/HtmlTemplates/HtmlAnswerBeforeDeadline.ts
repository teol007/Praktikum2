import { Answer, AnswerWithId } from "../../Interfaces/Answer";
import { Question, QuestionWithId } from "../../Interfaces/Question";
import { UserCustomInfo } from "../../Interfaces/UserCustomInfo";
import { getAnswerDeadlineDate, toSlovenianDateTime } from "../DateConverters";

export const htmlAnswerBeforeDeadline = (question: Question|QuestionWithId, answer: Answer|AnswerWithId, author: UserCustomInfo, isFileAttached: boolean): string => {
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
        <p class="normalText">Pozdravljeni.<br /><br />Rok za oddajo odgovora na vprašanje za katerega ste odgovorni se bliža.</p>
        <hr />
        <h2>Podrobnosti</h2>
        <p class="question-description"><strong>Vprašanje:</strong> ${question.description}</p>
        <p class="law-fields"><strong>Rok oddaje:</strong> <span style="color: orange;">${answer.authorAssigned ? toSlovenianDateTime(getAnswerDeadlineDate(answer.authorAssigned.toDate())) : '<i>Neznano</i>'}</span></p>
        <div class="assigned-info">
          <p><strong>Dodeljeno osebi:</strong> ${author.academicTitle+' '+author.fullName}</p>
          <p><strong>Datum dodelitve:</strong> ${answer.authorAssigned ? toSlovenianDateTime(answer.authorAssigned.toDate()) : '<i>Ni navedeno</i>'}</p>
          ${isFileAttached ? '<p>V priponki je priložena datoteka, ki ste jo nazadnje oddali.</p>' : ''}
        </div>
        <hr />
        <br />
        <p class="footer normalText">Lep pozdrav<br />organizacija Pravo za vse</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}
