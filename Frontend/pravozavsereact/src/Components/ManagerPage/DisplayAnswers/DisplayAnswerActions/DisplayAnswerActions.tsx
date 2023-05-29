import React, { useRef, useState } from "react";
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { DropdownChangeEvent } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { db } from "../../../../Config/Firebase";
import { useAtom } from "jotai";
import { usersDBAtom } from "../../../../Atoms/UsersDBAtom";
import { Answer, AnswerWithId, Status } from "../../../../Modules/Interfaces/Answer";
import { questionsDBAtom } from "../../../../Atoms/QuestionsDBAtom";
import AnswerDetails from "../../../Answer/AnswerDetails/AnswerDetails";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { groupedUsers } from "../../../../Modules/Functions/GroupedUsers";

interface AnswerActionsProps {
  answer: AnswerWithId;
}

export default function DisplayAnswerActions(props: AnswerActionsProps): JSX.Element {
  const [users] = useAtom(usersDBAtom);
  const [selectedAuthor, setSelectedAuthor] = useState<UserCustomInfo|undefined>(users.find((user) => (user.uid === props.answer.authorUid)));
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [questions] = useAtom(questionsDBAtom);

  const changeAuhtorOfAnswer = async (authorOfAnswer: UserCustomInfo) => {
    try {
      if(props.answer.authorUid===authorOfAnswer.uid)
        return;

      const answerRef = doc(db, "Answers", props.answer.id);
      await updateDoc(answerRef, {
        authorUid: authorOfAnswer.uid,
        authorAssigned: Timestamp.now(),
      });
      
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
      changeAuhtorOfAnswer(selectedAuthor);
  }

  const getQuestionOfAnswer = (answer: AnswerWithId|Answer): QuestionWithId|undefined => (questions.find((question)=>(question.id === answer.questionId)))

  const confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
        target: event.currentTarget,
        message: <>Ali res želiš <strong>popolnoma izbrisati</strong> ta odgovor na vprašanje?</>,
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: 'p-button-danger',
        async accept() {
          try {
            await deleteDoc(doc(db, "Answers", props.answer.id));
          } catch (error) {
            console.warn(error);
          }
        },
    });
  };

  
  return (
    <>
      <div className="flex flex-wrap justify-content-end gap-2">
        <div style={{marginLeft: '3em', marginRight: '3em'}}>
          <AnswerDetails answer={props.answer} withPersonalData={true} withQuestionPersonalData={true} >
            <Button label="Spremeni avtorja odgovora" icon="pi pi-user-edit" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{display: 'inline-block', margin: '1px'}} disabled={props.answer.answered ? true : false} />
            <ConfirmPopup />
            <Button label="Izbriši odgovor na vprašanje" icon="pi pi-times" onClick={confirmDelete} size="small" style={{display: 'inline-block', margin: '1px'}} severity="danger" />
          </AnswerDetails>
          <Button label="Pošlji uporabniku" icon="pi pi-send" size="small" onClick={() => {console.log('TODO')/* //! */}} style={{width: '100%', margin: '1px'}} disabled={props.answer.answered&&props.answer.responses.filter((response)=>(response.status===Status.Good)).length>=3 ? false : true} />
        </div>

        <OverlayPanel ref={overlayPanelRef} showCloseIcon >
          <form onSubmit={handleSubmit}>
            <span style={{marginBottom: '0.5em'}}>Spremeni avtorja odgovora</span><br />
            <Dropdown value={selectedAuthor} onChange={handleChange} options={groupedUsers(users, getQuestionOfAnswer(props.answer))} placeholder="Določi avtorja odgovora"  className="w-full md:w-14rem" style={{width: 'min-content'}} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" filter required />
            <Button type="submit" label="Potrdi" icon="pi pi-check" />
          </form>
        </OverlayPanel>
      </div>
    </>
  );
}