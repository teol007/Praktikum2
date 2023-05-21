import React from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import AnswersToEvaluate from "./AnswersToEvaluate/AnswersToEvaluate";



export default function DisplayAnswersToEvaluate(): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [answer] = useAtom(answersDBAtom);

  const unassignedQuestionActions = (question: QuestionWithId): JSX.Element => (
    <AnswersToEvaluate question={question} />
  );

  const filterUnassignedQuestions = (questions: QuestionWithId[]): QuestionWithId[] => {
    const assignedQuestionsIDs = answer.map((answer)=>(answer.questionId));
    return questions.filter((question)=>(!assignedQuestionsIDs.includes(question.id)));
  }

  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Odgovori za oceniti</h2>
      <div className="row">
      {filterUnassignedQuestions(questions).map(question => (
          <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
              <Card title={question.lawField}  footer={()=>(unassignedQuestionActions(question))} className="md:w-25rem">
                
              </Card>
          </div>
      ))}
      </div>
    </div>
  );
}