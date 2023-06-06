import React from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import TimeUntilAnswered from "../../Answer/TimeUntilAnswered/TimeUntilAnswered";
import DisplayAnswerActions from "./DisplayAnswerActions/DisplayAnswerActions";
import ResponsesStatusesCount from "../../Answer/Response/ResponsesStatusesCount/ResponseStatuses";
import AutoEmailSettings from "./AutoEmailSettings/AutoEmailSettings";
import TimeUntilResponsesDeadline from "../../Answer/TimeUntilResponsesDeadline/TimeUntilResponsesDeadline";
import DisplayLawFieldsText from "../../Questions/DisplayLawFields/DisplayLawFieldsText/DisplayLawFieldsText";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";

export default function DisplayAnswers(): JSX.Element {
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);
  const [questions] = useAtom(questionsDBAtom);


  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user) => user.uid === answer.authorUid)?.academicTitle + ' ';
    text += users.find((user) => user.uid === answer.authorUid)?.fullName;
    return <>{text}</>;
  };

  const getQuestionById = (questionId: string) => {
    const question = questions.find((question) => question.id === questionId);
    return question;
  };

  return (
    <div className="container">
      <h2 style={{ marginTop: '1em' }}>Dodeljena vprašanja</h2>
      <AutoEmailSettings />
      <div className="row">
        {answers
          .filter((answer) => !(answer.published && answer.fileUrl !== ''))
          .map((answer) => {
            const question = getQuestionById(answer.questionId);
            return (
              <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
                <Card title={question ? <DisplayLawFieldsText lawFields={question.lawFields} /> : null} subTitle={() => answerAuthor(answer)} footer={<DisplayAnswerActions answer={answer} />} className="md:w-25rem">
                  <TimeUntilAnswered answer={answer} />
                  <hr />
                  <TimeUntilResponsesDeadline answer={answer} />
                  <hr />
                  <ResponsesStatusesCount responses={answer.responses} />
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
