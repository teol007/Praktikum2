import React from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import ResponseToAnswer from "./Response/ResponseToAnswer";
import AnswerDetails from "../../Answer/AnswerDetails/AnswerDetails";
import { userAuthentication } from "../../../Atoms/UserAuthentication";


export default function DisplayAnswersToEvaluate(): JSX.Element {
  const [user] = useAtom(userAuthentication);
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    console.log(answer.answered)
    console.log(answer.authorUid)

    text += users.find((user)=>(user.uid===answer.authorUid))?.academicTitle+' ';
    text += users.find((user)=>(user.uid===answer.authorUid))?.fullName;
    return <>{text}</>;
    
  };

  const answersCommenterUid = answers.filter((answer) => (answer.responses.every((response) => response.commenterUid !== user?.uid))
);


  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Vprašanja za oceniti</h2>
      <div className="row">
      {answersCommenterUid.map(answer => (
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
            <Card title={<></>} subTitle={ <><span>Avtor odgovora: </span><span>{answerAuthor(answer)}</span></>}  className="md:w-25rem">
              <div style={{marginLeft: '3em', marginRight: '3em'}}>
                <AnswerDetails answer={answer} />
                <ResponseToAnswer answer={answer} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}