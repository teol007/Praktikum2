import React, { useRef, useState } from "react";
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { Group, UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { DropdownChangeEvent } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { db } from "../../../../Config/Firebase";
import QuestionDetails from "../../../Questions/QuestionDetails/QuestionDetails";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../../Atoms/UsersDBAtom";
import { Answer } from "../../../../Modules/Interfaces/Answer";


interface QuestionActionsProps {
  question: QuestionWithId;
}

interface DropdownGroup {
  label: string;
  items: DropdownItem[];
}

interface DropdownItem {
  label: string;
  value: UserCustomInfo;
}



export default function UnassignedQuestionActions(props: QuestionActionsProps): JSX.Element {
  const [selectedAuthor, setSelectedAuthor] = useState<UserCustomInfo|undefined>(/*props.authors.find((author) => (author.uid === props.question.selectedRespondentUid*/undefined);
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);

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

  const authors = () => (users.filter((user)=>(user.group===Group.Author)));
  const authorsOfLawField = (lawField: string) => (authors().filter((author)=>(author.lawFields.includes(lawField))));
  const authorsNotOfLawField = (lawField: string) => (authors().filter((author)=>(!author.lawFields.includes(lawField))));
  const grupedAuthors = (): DropdownGroup[] => ([
    {
      label: props.question.lawField,
      items: authorsOfLawField(props.question.lawField).map((author)=>({label: author.academicTitle+' '+author.fullName, value: author}))
    },
    {
      label: 'Ostali',
      items: authorsNotOfLawField(props.question.lawField).map((author)=>({label: author.academicTitle+' '+author.fullName, value: author}))
    }
  ]);
  
  
  return (
    <>
      <div className="flex flex-wrap justify-content-end gap-2">
        <div style={{marginLeft: '3em', marginRight: '3em'}}>
          <QuestionDetails question={props.question} />
          <Button label="Dodeli avtorja odgovora" icon="pi pi-user-plus" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{width: '100%', margin: '1px'}} />
        </div>

        <OverlayPanel ref={overlayPanelRef} showCloseIcon >
          <form onSubmit={handleSubmit}>
            <span style={{marginBottom: '0.5em'}}>Določi avtorja odgovora</span><br />
            <Dropdown value={selectedAuthor} onChange={handleChange} options={grupedAuthors()} placeholder="Določi avtorja odgovora"  className="w-full md:w-14rem" style={{width: 'min-content'}} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" filter required />
            <Button type="submit" label="Potrdi" icon="pi pi-check" />
          </form>
        </OverlayPanel>
      </div>
    </>
  );

}