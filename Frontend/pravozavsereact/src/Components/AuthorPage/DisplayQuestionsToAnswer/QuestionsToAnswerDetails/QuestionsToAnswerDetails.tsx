import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { useAtom } from "jotai";
import { Answer } from "../../../../Modules/Interfaces/Answer";
import { db} from "../../../../Config/Firebase";
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { answersDBAtom } from "../../../../Atoms/AnswersDBAtom";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { OverlayPanel } from "primereact/overlaypanel";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import QuestionDetailsReadOnly from "./QuestionDetailsReadOnly";

interface QuestionActionsProps {
  question: QuestionWithId;
}

export default function QuestionsToAnswerDetails(props: QuestionActionsProps): JSX.Element {
  const [selectedAuthor, ] = useState<UserCustomInfo|undefined>(undefined);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [answers] = useAtom(answersDBAtom);

  const navigate = useNavigate();

  const selectQuestionToAnswer = (questionId: string) => {
    navigate("/avtor/odgovor/" + questionId);
  }

  const defineAnwser = async (authorOfAnswer: UserCustomInfo) => {
    const existingAnswer = answers.find((answer)=>(answer.questionId === props.question.id));
    try {
      if(existingAnswer)
      {
        if(existingAnswer.authorUid===authorOfAnswer.uid)
          return;

        const answerRef = doc(db, "Answers", existingAnswer.id);
        await updateDoc(answerRef, {
          questionId: props.question.id,
          authorUid: authorOfAnswer.uid,
          authorAssigned: Timestamp.now(),
        });
      }
      else {
        const newAnswer: Answer = {
          questionId: props.question.id,
          authorUid: authorOfAnswer.uid,
          authorAssigned: Timestamp.now(),
          title: '',
          content: '',
          tags: [],
          answered: null,
          responses: [],
          published: null,
        };
        await addDoc(collection(db, "Answers"), newAnswer);
      }
      overlayPanelRef.current?.hide();
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if(selectedAuthor)
      defineAnwser(selectedAuthor);
  }

  
  return (
    <>
      <div className="flex flex-wrap justify-content-end gap-2">
        <div style={{marginLeft: '3em', marginRight: '3em'}}>
          <QuestionDetailsReadOnly question={props.question} />
          <Button label="Odgovori" severity="success" icon="pi pi-user-plus" onClick={() => selectQuestionToAnswer(props.question.id)} size="small" style={{width: '100%', margin: '1px'}} />
        </div>

        <OverlayPanel ref={overlayPanelRef} showCloseIcon >
          <form onSubmit={handleSubmit}>
            <span style={{marginBottom: '0.5em'}}>Določi avtorja odgovora</span><br />
            <Button type="submit" label="Potrdi" icon="pi pi-check" />
          </form>
        </OverlayPanel>
      </div>
    </>
  );

}