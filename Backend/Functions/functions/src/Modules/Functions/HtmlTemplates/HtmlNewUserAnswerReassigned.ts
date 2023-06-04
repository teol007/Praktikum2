import { Question, QuestionWithId } from "../../Interfaces/Question";
import { toSlovenianDateTimePlusTimezoneDifference } from "../DateConverters";

export const htmlNewUserAnswerReassigned = (question: Question|QuestionWithId, authorAssignedName: string, authorReassignedDate: Date|undefined|null, isFileAttached: boolean): string => {
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
        <p class="normalText">Pozdravljeni.<br /><br />Obveščamo vas, da je vprašanje bilo predodeljeno vam.</p>
        <hr />
        <h2>Podrobnosti</h2>
        <p class="question-description"><strong>Vprašanje:</strong> ${question.description}</p>
        <p class="law-fields"><strong>Pravna področja:</strong> ${question.lawFields.join(", ").toLowerCase()}</p>
        <div class="assigned-info">
          <p><strong>Predodeljeno osebi:</strong> ${authorAssignedName}</p>
          <p><strong>Datum predodelitve:</strong> ${authorReassignedDate ? toSlovenianDateTimePlusTimezoneDifference(authorReassignedDate) : '<i>Ni navedeno</i>'}</p>
          ${isFileAttached ? '<p>Predhodno dodeljena oseba je že <strong>oddala datoteko z (delnim) odgovorom</strong>, s katero lahko nadaljujete. Datoteka je v priponki.</p>' : ''}
        </div>
        <hr />
        <br />
        <p class="footer normalText">Lep pozdrav<br />organizacija Pravo za vse</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}