import { Question, QuestionWithId } from "../../Interfaces/Question";
import { toSlovenianDateTime } from "../DateConverters";

export const htmlQuestionReceived = (question: QuestionWithId|Question): string => {
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
        <p class="normalText">Pozdravljeni.<br /><br />Vaše pravno vprašanje smo prejeli. Odgovorili vam bomo v roku 15 dni.</p>
        <hr />
        <h2>Podrobnosti vprašanja</h2>
        <p class="question-description"><strong>Vprašanje:</strong> ${question.description}</p>
        <p class="law-fields"><strong>Pravna področja:</strong> ${question.lawFields.join(", ").toLowerCase()}</p>
        <div class="assigned-info">
          <p><strong>Datum prejema:</strong> ${question.created ? toSlovenianDateTime(question.created.toDate()) : '<i>Ni navedeno</i>'}</p>
        </div>
        <hr />
        <p><i>Če niste postavili nobenega vprašanja ali ne veste zakaj ste prejeli to sporočilo, ga ignorirajte.</i><br /><i>If you have not asked any questions or do not know why you received this message, ignore it.</i></p>
        <br />
        <p class="footer normalText">Lep pozdrav<br />organizacija Pravo za vse</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}