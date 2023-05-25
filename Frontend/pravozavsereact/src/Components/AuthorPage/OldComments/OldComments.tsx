import React from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import EditComment from "./EditComments.tsx/EditComments";
import AnswerDetails from "../../Answer/AnswerDetails/AnswerDetails";
import { userAuthentication } from "../../../Atoms/UserAuthentication";


export default function OldComments(): JSX.Element {
  const [user] = useAtom(userAuthentication);
  const [answers] = useAtom(answersDBAtom);


  const filteredAnswers = answers.filter((answer) =>
    answer.responses.some((response) => response.commenterUid === user?.uid)
  );

  return (
    <div className="container">
      <h2 style={{ marginTop: '1em' }}>Stari komentarji</h2>
      <div className="row">
        {filteredAnswers.map((answer) => (
          <div
            key={answer.id}
            className="col flex justify-content-center"
            style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
          >
            <Card title={<></>} className="md:w-25rem">
              <div style={{ marginLeft: '3em', marginRight: '3em' }}>
                {answer.responses
                  .filter((response) => response.commenterUid === user?.uid)
                  .map((response) => (
                    <div
                      key={response.created.toDate().getTime()}
                      style={{
                        border: '1px solid #ccc',
                        padding: '15px',
                        margin: '15px',
                        borderRadius: '10px',
                      }}
                    >
                      <p>
                        <b>Vaš komentar:</b> {response.description}
                      </p>
                      <EditComment answer={answer} responseDescription={response.description} />
                    </div>
                  ))}

                <AnswerDetails answer={answer} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
