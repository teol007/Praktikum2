import React from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../../Config/Firebase";
import EditComment from "./EditComments.tsx/EditComments";
import AnswerDetails from "../../Answer/AnswerDetails/AnswerDetails";


// ...

export default function OldComments(): JSX.Element {
  const [user] = useAuthState(firebaseAuth);
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user) => user.uid === answer.authorUid)?.academicTitle + ' ';
    text += users.find((user) => user.uid === answer.authorUid)?.fullName;
    return <>{text}</>;
  };

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
