import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, db } from "../../../../Config/Firebase";
import { Dropdown } from "primereact/dropdown";

export interface EditCommentProps{
    answer: AnswerWithId;
    responseDescription: string;
  }

  export default function EditComment(props: EditCommentProps): JSX.Element {
    const [user] = useAuthState(firebaseAuth);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<string>(props.responseDescription);
    const [selectedStatus, setSelectedStatus] = useState();
  
    const addResponse = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault(); 
      try {
        const answerWithResponseIndex = props.answer.responses.findIndex(response => response.commenterUid === user?.uid);

        if (answerWithResponseIndex !== -1) {
          const updatedResponses = [...props.answer.responses];
          updatedResponses[answerWithResponseIndex].description = value;
        
          const answerRef = doc(db, "Answers", props.answer.id);
          await updateDoc(answerRef, {
            responses: updatedResponses,
          });
        } else {
          console.error('Ne najdem komentarja');
        }
      } catch (error) {
        console.error(error);
      }
      setVisible(false);
    };
  
    const handleClick = () => {
      setVisible(true);
    }

    const statuses = [
      { name: 'Močno se ne strinjam', icon:'pi-cloud' },
      { name: 'Ne strinjam se ', code: 'RM' },
      { name: 'Močno se ne strinjam', code: 'LDN' },
      
  ];
   
  
    return (
      <>
        <div className="flex justify-content-center">
          <Button label="Uredi komentar" icon="pi pi-external-link" className="p-button p-button p-button-primary" size="small" onClick={handleClick} style={{width: '100%', margin: '1px'}} />
          <Dialog header="Podrobnosti odgovora na vprašanje" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} blockScroll={true}>
            <div>
              <b>Vaš komentar: </b>
              <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={7} cols={140} />
              <Button label="Potrdi" icon="pi pi-check"  onClick={addResponse} autoFocus />
            </div>
          </Dialog>
        </div>
      </>
    );
  }
  