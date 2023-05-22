import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { Card } from 'primereact/card';
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../../Config/Firebase";
import TimeUntilAnswered from "../../Answer/TimeUntilAnswered/TimeUntilAnswered";
import ResponsesStatusesCount from "../../Answer/Response/ResponsesStatusesCount/ResponseStatuses";
import PendingAnswerActions from "./PendingAnswerActions/PendingAnswerActions";

export function PendingAnswers(): JSX.Element {
  const [answers] = useAtom(answersDBAtom);
  const [user] = useAuthState(firebaseAuth);

  const answersForAuthor = () => (answers.filter((answer)=>(answer.authorUid===user!.uid)));

  return(
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Dodeljena vprašanja za odgovoriti</h2>
      {
        answersForAuthor().map((answer)=>(
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
            <Card title={<></>} subTitle={<>Subtitle</>} footer={<PendingAnswerActions answer={answer} />} className="md:w-25rem">
              <TimeUntilAnswered answer={answer} />
              <hr />
              <ResponsesStatusesCount responses={answer.responses} />
            </Card>
          </div>
        ))
      }
    </div>
      
  );
}