import React, { useState } from "react";
import { Button } from "primereact/button";
import { AnswerWithId, Response, Status } from "../../../../Modules/Interfaces/Answer";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { doc, updateDoc, Timestamp, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../../../../Config/Firebase";
import { userAuthentication } from "../../../../Atoms/UserAuthentication";
import { useAtom } from "jotai";
import { answerResponseOrganizationDocId } from "../../../../Config/OrganizationDocuments";
import { AnswerResponseOrganizationDoc } from "../../../../Modules/Interfaces/OrganizationsDocs";

export interface ResponseProps{
  answer: AnswerWithId
}

export default function ResponseToAnswer(props: ResponseProps): JSX.Element {
  const [user] = useAtom(userAuthentication);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.VeryBad);

  const addResponse = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); 
    try {
      if(!user)
        return;

      const newResponse: Response = {
        commenterUid: user.uid,
        created: Timestamp.now(),
        status: status,
        description: value,
      };
      const answerRef = doc(db, "Answers", props.answer.id); 
      await updateDoc(answerRef, {
        responses: arrayUnion(newResponse),
      });

      const answerResponseOrganizationRef = doc(db, "Organizations", answerResponseOrganizationDocId);
      const answerResponseSendEmail: AnswerResponseOrganizationDoc = {
        answerId: props.answer.id,
        lastResponse: newResponse
      };
      await setDoc(answerResponseOrganizationRef, {...answerResponseSendEmail});
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(true);
  }

 
  return (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Strinjam se" severity="success" icon="pi pi-thumbs-up"  size="small" style={{width: '100%', margin: '1px'}} onClick={() => setStatus(Status.Good)} onClickCapture={handleClick} />
        <Button label="Ne strinjam se" severity="warning" icon="pi pi-thumbs-down" size="small" style={{width: '100%', margin: '1px'}} onClick={() => setStatus(Status.Bad)} onClickCapture={handleClick} />
        <Button label="Močno se ne strinjam" severity="danger" icon="pi pi-thumbs-down" size="small" style={{width: '100%', margin: '1px'}} onClick={() => setStatus(Status.VeryBad)} onClickCapture={handleClick} />
        <div className="card flex justify-content-center">
            <Dialog header="Komentar na odgovor" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} >
              <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={7} cols={140} />
              <Button label="Potrdi" icon="pi pi-check"  onClick={(event) => addResponse(event)} autoFocus />
            </Dialog>
        </div>
    </div>
  );
}