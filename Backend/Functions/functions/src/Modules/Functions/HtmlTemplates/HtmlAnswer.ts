import { AnswerWithId } from "../../Interfaces/Answer";
import { QuestionWithId } from "../../Interfaces/Question";
import { toSlovenianDateTimePlusTimezoneDifference } from "../DateConverters";

export const htmlAnswer = (question: QuestionWithId, answer: AnswerWithId): string => {
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
        .law-fields {
          margin-bottom: 10px;
        }
        .normalText {
          margin-bottom: 10px;
        }
        .assigned-info {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <p class="normalText">Spoštovani,<br /><br />v priponki vam pošiljamo odgovor na vaše zastavljeno pravno vprašanje, hkrati pa se vam zahvaljujemo za izkazano zaupanje.</p>
        <hr />
        <h2>Podrobnosti vprašanja</h2>
        <p class="question-description"><strong>Vaše vprašanje:</strong> ${question.description}</p>
        <div class="assigned-info">
          <p><strong>Vprašanje smo prejeli:</strong> ${toSlovenianDateTimePlusTimezoneDifference(question.created.toDate())}</p>
        </div>
        <p class="law-fields"><strong>Spada med pravna področja:</strong> ${question.lawFields.join(", ").toLowerCase()}</p>
        <p class="law-fields"><strong>Oznake:</strong> ${answer.tags.length<=0 ? '/' : answer.tags.join(", ").toLowerCase()}</p>
        <p class="law-fields">Dokument s pravnim odgovorom se nahaja v priponki.</p>
        <hr />
        <p><i>Če niste postavili nobenega vprašanja ali ne veste zakaj ste prejeli to sporočilo, ga ignorirajte.</i><br /><i>If you have not asked any questions or do not know why you received this message, ignore it.</i></p>
        
        <br />
        <p class="footer normalText">V upanju na čimboljši razplet vas lepo pozdravljamo.<br />Ekipa spletnega portala Pravo za VSE</p>
      </div>
    </body>
    </html>`;

  return htmlTemplate;
}
