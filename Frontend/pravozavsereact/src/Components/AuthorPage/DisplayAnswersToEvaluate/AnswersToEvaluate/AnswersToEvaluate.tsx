import React, { useRef, useState } from "react";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { DropdownChangeEvent } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useAtom } from "jotai";
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { Group, UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { answersDBAtom } from "../../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../../Atoms/UsersDBAtom";
import { db } from "../../../../Config/Firebase";
import { Answer } from "../../../../Modules/Interfaces/Answer";
import AnswerDetails from "../AnswerDetails/AnswerDetails";



interface QuestionActionsProps {
  question: QuestionWithId;
}

export default function AnswersToEvaluate(props: QuestionActionsProps): JSX.Element {
  const [selectedAuthor, setSelectedAuthor] = useState<UserCustomInfo|undefined>(/*props.authors.find((author) => (author.uid === props.question.selectedRespondentUid*/undefined);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);

  const authors = () => (users.filter((user)=>(user.group===Group.Author)));

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
      else
      {
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

  const handleChange = (e: DropdownChangeEvent):void => {
    setSelectedAuthor(e.target.value);
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
          <AnswerDetails question={props.question} />
          <Button label="Strinjam se" severity="success" icon="pi pi-thumbs-up" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{width: '100%', margin: '1px'}} />
          <Button label="Ne strinjam se" severity="warning" icon="pi pi-thumbs-down" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{width: '100%', margin: '1px'}} />
          <Button label="Močno se ne strinjam" severity="danger" icon="pi pi-thumbs-down" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{width: '100%', margin: '1px'}} />

        </div>

        
      </div>
    </>
  );

}