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


export default function OldComments(): JSX.Element {
  const [user] = useAuthState(firebaseAuth);
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user)=>(user.uid===answer.authorUid))?.academicTitle+' ';
    text += users.find((user)=>(user.uid===answer.authorUid))?.fullName;
    return <>{text}</>;
  };
 
  const answersCommenterUid = answers.filter((answer) =>
  answer.responses.every((response) => response.commenterUid !== user?.uid)
  );

  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Stari komentarji</h2>
      <div className="row">
      {answers.filter(answer => !answersCommenterUid.includes(answer)).map(answer => (
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
            <Card title={<></>} subTitle={ <><span>Avtor odgovora: </span><span>{answerAuthor(answer)}</span></>}  className="md:w-25rem">
              <div style={{marginLeft: '3em', marginRight: '3em'}}>
                {answer.responses.map(response => (
                  <div key={response.created.toDate().getTime()}>
                    <p style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', }}><b>Vaš komentar:</b> {response.description}</p>
                    <EditComment answer={answer} responseDescription={response.description}/>
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