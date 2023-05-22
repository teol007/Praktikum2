import React from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { Button } from "primereact/button";
import AnswerToEvaluateDetails from "./AnswerToEvaluateDetails/AnswerToEvaluateDetails";
import ResponseToAnswer from "./Response/ResponseToAnswer";


export default function DisplayAnswersToEvaluate(): JSX.Element {
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user)=>(user.uid===answer.authorUid))?.academicTitle+' ';
    text += users.find((user)=>(user.uid===answer.authorUid))?.fullName;
    return <>{text}</>;
  };

  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Vprašanja za oceniti</h2>
      <div className="row">
      {answers.map(answer => (
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
              <Card title={<></>} subTitle={() => (answerAuthor(answer))}  className="md:w-25rem">
              <div style={{marginLeft: '3em', marginRight: '3em'}}>
                <AnswerToEvaluateDetails answer={answer} />
                <ResponseToAnswer answer={answer} />
               </div>
              </Card>
          </div>
      ))}
      </div>
    </div>
  );
}