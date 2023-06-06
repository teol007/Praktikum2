import React from "react";
import { Card } from 'primereact/card';
import { toSlovenianDate, toSlovenianTime } from "../../../Modules/Functions/DateConverters";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import UnassignedQuestionActions from "./UnassignedQuestionActions/UnassignedQuestionActions";
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import DisplayLawFieldsText from "../../Questions/DisplayLawFields/DisplayLawFieldsText/DisplayLawFieldsText";


export default function DisplayUnassignedQuestions(): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [answers] = useAtom(answersDBAtom);

  const unassignedQuestionActions = (question: QuestionWithId): JSX.Element => (
    <UnassignedQuestionActions question={question} />
  );

  const filterUnassignedQuestions = (questions: QuestionWithId[]): QuestionWithId[] => {
    const assignedQuestionsIDs = answers.map((answer)=>(answer.questionId));
    return questions.filter((question)=>(!assignedQuestionsIDs.includes(question.id)));
  }

  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Nedodeljena vprašanja</h2>
      <div className="row">
      {filterUnassignedQuestions(questions).map(question => (
          <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
              <Card title={<DisplayLawFieldsText lawFields={question.lawFields} />} subTitle={question.customerEmail} footer={()=>(unassignedQuestionActions(question))} className="md:w-25rem">
                <p className="m-0">
                  Ustvarjeno:<br />
                  {toSlovenianDate(question.created.toDate())} ob {toSlovenianTime(question.created.toDate())}
                </p>
              </Card>
          </div>
      ))}
      </div>
    </div>
  );
}