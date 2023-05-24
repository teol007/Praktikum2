import React, { useState } from "react";
import { Button } from "primereact/button";
import { Answer, AnswerWithId, Status } from "../../../../Modules/Interfaces/Answer";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useAtom } from "jotai";
import { doc, updateDoc, Timestamp, addDoc, collection, arrayUnion } from "firebase/firestore";
import { answersDBAtom } from "../../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../../Atoms/UsersDBAtom";
import { db, firebaseAuth } from "../../../../Config/Firebase";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { useAuthState } from "react-firebase-hooks/auth";

export interface ResponseProps{
  answer: AnswerWithId
}

export default function ResponseToAnswer(props: ResponseProps): JSX.Element {
  const [user] = useAuthState(firebaseAuth);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<String>();




const addResponse = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault(); 
  try {
    const newResponse = {
      commenterUid: user?.uid,
      created: Timestamp.now(),
      status: status,
      description: value,
    };
    const answerRef = doc(db, "Answers", props.answer.id); 
    await updateDoc(answerRef, {
      responses: arrayUnion(newResponse),
    });
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
        <Button label="Strinjam se" severity="success" icon="pi pi-thumbs-up"  size="small" style={{width: '100%', margin: '1px'}} onClick={() => setStatus('Good')} onClickCapture={handleClick} />
        <Button label="Ne strinjam se" severity="warning" icon="pi pi-thumbs-down" size="small" style={{width: '100%', margin: '1px'}} onClick={() => setStatus('Bad')} onClickCapture={handleClick} />
        <Button label="Močno se ne strinjam" severity="danger" icon="pi pi-thumbs-down" size="small" style={{width: '100%', margin: '1px'}} onClick={() => setStatus('Very Bad')} onClickCapture={handleClick} />
        <div className="card flex justify-content-center">
            <Dialog header="Komentar na odgovor" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} >
              <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={7} cols={140} />
              <Button label="Potrdi" icon="pi pi-check"  onClick={(event) => addResponse(event)} autoFocus />
            </Dialog>
        </div>
    </div>
  );
}