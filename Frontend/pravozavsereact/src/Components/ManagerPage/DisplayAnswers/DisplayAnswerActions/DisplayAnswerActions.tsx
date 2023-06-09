import React, { useRef, useState } from "react";
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { Timestamp, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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
import { publishOrganizationDocId, reassignedAuthorOrganizationDocId } from "../../../../Config/OrganizationDocuments";
import { ReassignedAuthorOrganizationDoc } from "../../../../Modules/Interfaces/OrganizationsDocs";

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

      const lastAuthorUid = props.answer.authorUid;
      const answerRef = doc(db, "Answers", props.answer.id);
      await updateDoc(answerRef, {
        authorUid: authorOfAnswer.uid,
        authorAssigned: Timestamp.now(),
      });
      const reassignedAuthorOrganizationRef = doc(db, "Organizations", reassignedAuthorOrganizationDocId);
      const reassignedAuthor: ReassignedAuthorOrganizationDoc = {
        answerId: props.answer.id,
        lastAssignedAnswerAuthorUid: lastAuthorUid ?? '',
        newReassignedAnswerAuthorUid: authorOfAnswer.uid
      };
      await setDoc(reassignedAuthorOrganizationRef, reassignedAuthor);
      
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

  const confirmPublish = (event: React.MouseEvent<HTMLButtonElement>) => {
    let message: JSX.Element = <>Zaključi in pošlji ta odgovor tistemu, ki je postavil vprašanje?</>;
    let positiveReactions = 0;
    props.answer.responses.forEach((response) => {if(response.status === Status.Good) positiveReactions++;})
    if(positiveReactions < 3)
      message = <><strong style={{color: 'red'}}>Pozor, to vprašanje je kot dobro ocenilo le {positiveReactions}/3 drugih avtorjev.</strong><br />Ali res želiš zaključiti in poslati ta odgovor tistemu, ki je postavil vprašanje?</>;
    
    confirmPopup({
      target: event.currentTarget,
      message: message,
      icon: 'pi pi-exclamation-triangle',
      async accept() {
        try {
          const PublishOrganizationDocRef = doc(db, "Organizations", publishOrganizationDocId);
          await setDoc(PublishOrganizationDocRef, {lastPublishedAnswerId: props.answer.id}, {merge:true});
        } catch (error) {
          console.warn(error);
        }
      },
    });
  };

  const handlePublish = (e: React.MouseEvent<HTMLButtonElement>) => {
    confirmPublish(e);
  }

  
  return (
    <>
      <div className="flex flex-wrap justify-content-end gap-2">
        <div style={{marginLeft: '3em', marginRight: '3em'}}>
        <ConfirmPopup />
          <AnswerDetails answer={props.answer} withPersonalData={true} withQuestionPersonalData={true} editQuestionLawFields={true} >
            <Button label="Spremeni avtorja odgovora" icon="pi pi-user-edit" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{display: 'inline-block', margin: '1px'}} disabled={props.answer.published ? true : false} />
            <Button label="Izbriši odgovor na vprašanje" icon="pi pi-times" onClick={confirmDelete} size="small" style={{display: 'inline-block', margin: '1px'}} severity="danger" />
          </AnswerDetails>
          <Button label={props.answer.published ? 'Že zaključeno' : (props.answer.fileUrl!=='' ? 'Pošlji uporabniku' : 'Odgovor je brez datoteke')} icon="pi pi-send" size="small" onClick={handlePublish} style={{width: '100%', margin: '1px'}} disabled={(props.answer.published || props.answer.fileUrl==='') ? true : false} />
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
