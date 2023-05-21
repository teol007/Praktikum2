import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { Card } from 'primereact/card';
import QuestionsToAnswerDetails from "./QuestionsToAnswerDetails/QuestionsToAnswerDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../../Config/Firebase";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import TimeUntilAnswered from "../../Answer/TimeUntilAnswered/TimeUntilAnswered";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { Timestamp } from "firebase/firestore";

export function QuestionsToAnswer (){

    const [questions] = useAtom(questionsDBAtom);
    const [answer] = useAtom(answersDBAtom);

    const [user /*, loading, error */] = useAuthState(firebaseAuth);
    const userID = user?.uid;

    const testniArray: AnswerWithId[] = [];

    answer.forEach(element => {
      if (element.authorUid === userID){
        testniArray.push(element);
      }
    });

    const questionIDsArray: string[] = [];
    testniArray.forEach(a => {
      questionIDsArray.push(a.questionId)
    });

    const userQuestions = questions.filter((question) => (questionIDsArray.includes(question.id)))
    
    const unassignedQuestionActions = (question: QuestionWithId): JSX.Element => (
      <QuestionsToAnswerDetails question={question} />
    );
    
    const findAnswer = (question: QuestionWithId): AnswerWithId => {
      const existingAnswer = answer.find((answer)=>(answer.questionId === question.id));
      if (existingAnswer){
        return existingAnswer;
      } else {
          const newAnswer = {
          id: "1",
          questionId: "1",
          authorUid: "",
          customerEmail: "string",
          description: "string",
          lawField: "string",
          created: Timestamp.now(),
          authorAssigned: Timestamp.now(),
          title: "",
          content: "",
          tags: [],
          answered: null,
          responses: [],
          published: null,
          closed: false
        }
        return newAnswer;
      }
    }

    return(
      <div className="container">
        <h2 style={{marginTop: '1em'}}>Dodeljena vprašanja za odgovoriti</h2>
        <div className="row">
        {userQuestions.map(question => (
            <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
                <Card title={question.lawField} subTitle={question.customerEmail} footer={()=>(unassignedQuestionActions(question))} className="md:w-25rem">
                  <TimeUntilAnswered answer={findAnswer(question)} />
                </Card>
            </div>
        ))}
        </div>
      </div>
        
    )
}