import { frontendHostingUrlLoginPage } from "../../../Config/FrontendHostingConf";
import { Question, QuestionWithId } from "../../Interfaces/Question";

export const htmlLastUserAnswerReassigned = (question: Question|QuestionWithId): string => {
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
        <p class="normalText">Pozdravljeni,<br /><br />obveščamo vas, da je vprašanje, ki je bilo dodeljeno vam, sedaj dodeljeno drugi osebi. Za odgovor na vprašanje niste več odgovorni.</p>
        <hr />
        <h2>Podrobnosti</h2>
        <p class="question-description"><strong>Vprašanje:</strong> ${question.description}</p>
        <p class="law-fields"><strong>Pravna področja:</strong> ${question.lawFields.join(", ").toLowerCase()}</p>
        <p>Link do spletne strani: <a href="${frontendHostingUrlLoginPage}">Pravo za vse</a></p>
        <hr />
        <br />
        <p class="footer normalText">Lep pozdrav<br />ekipa spletnega portala Pravo za VSE</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}