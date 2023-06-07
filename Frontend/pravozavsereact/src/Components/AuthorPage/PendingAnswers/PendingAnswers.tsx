import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { Card } from 'primereact/card';
import TimeUntilAnswered from "../../Answer/TimeUntilAnswered/TimeUntilAnswered";
import ResponsesStatusesCount from "../../Answer/Response/ResponsesStatusesCount/ResponseStatuses";
import PendingAnswerActions from "./PendingAnswerActions/PendingAnswerActions";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import TimeUntilResponsesDeadline from "../../Answer/TimeUntilResponsesDeadline/TimeUntilResponsesDeadline";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";

export function PendingAnswers(): JSX.Element {
  const [answers] = useAtom(answersDBAtom);
  const [user] = useAtom(userAuthentication);
  const [questions] = useAtom(questionsDBAtom);

  const answersForAuthor = ():AnswerWithId[] => {
    if(!user)
      return [];
    return answers.filter((answer)=>(answer.authorUid===user.uid))
  };

  const findLawFields = (answer: AnswerWithId): string|undefined => {
    const question: QuestionWithId | undefined = questions.find((q) => q.id === answer.questionId);
    const lawField = question?.lawFields;
    const joinedLawFields = lawField?.join(" & ")
    return joinedLawFields;
  };

  return(
    <div className="container">
      <ProgressBar activeIndex={0} />
      <h2 style={{marginTop: '1em'}}>Dodeljena vprašanja za odgovoriti</h2>
      <div className="row">
      {
        answersForAuthor().map((answer)=>(
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
            <Card title={() => findLawFields(answer)} subTitle={undefined} footer={<PendingAnswerActions answer={answer} />} className="md:w-25rem">
              <TimeUntilAnswered answer={answer} />
              <hr />
              <TimeUntilResponsesDeadline answer={answer} />
              <hr />
              <ResponsesStatusesCount responses={answer.responses} />
            </Card>
          </div>
        ))
      }
      </div>
    </div>
      
  );
}