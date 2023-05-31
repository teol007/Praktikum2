import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { AnswerWithId, Status } from "../../../../Modules/Interfaces/Answer";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Config/Firebase";
import { useAtom } from "jotai";
import { userAuthentication } from "../../../../Atoms/UserAuthentication";
import { Dropdown } from "primereact/dropdown";

export interface EditCommentProps{
    answer: AnswerWithId;
    responseDescription: string;
    responseStatus: Status;
  }

  export default function EditComment(props: EditCommentProps): JSX.Element {
    const [user] = useAtom(userAuthentication);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<string>(props.responseDescription);
    const [status, setStatus] = useState<Status>(props.responseStatus); // Add status state
  
    const addResponse = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      try {
        const answerWithResponseIndex = props.answer.responses.findIndex(
          (response) => response.commenterUid === user?.uid
        );
  
        if (answerWithResponseIndex !== -1) {
          const updatedResponses = [...props.answer.responses];
          updatedResponses[answerWithResponseIndex].description = value;
          updatedResponses[answerWithResponseIndex].status = status; // Update the response's status
  
          const answerRef = doc(db, "Answers", props.answer.id);
          await updateDoc(answerRef, {
            responses: updatedResponses,
          });
        } else {
          console.error("Ne najdem komentarja");
        }
      } catch (error) {
        console.error(error);
      }
      setVisible(false);
    };
  
    const handleClick = () => {
      setVisible(true);
    };
  
    const statusOptions = [
      { label: "Strinjam se", value: "Good" },
      { label: "Ne strinjam se", value: "Bad" },
      { label: "Močno se ne strinjam", value: "Very bad" }
    ];

    const handleStatusChange = (e: { value: React.SetStateAction<Status>; }) => {
      setStatus(e.value);
    };
    
  
    return (
      <>
        <div className="flex justify-content-center">
          <Button label="Uredi komentar" icon="pi pi-external-link"  className="p-button p-button p-button-primary"  size="small" onClick={handleClick} style={{ width: "100%", margin: "1px" }} />
          <Dialog header="Podrobnosti odgovora na vprašanje" visible={visible} style={{ width: "90vw" }} onHide={() => setVisible(false)} blockScroll={true}>
            <div>
              <div style={{margin:"10px"}}>
              <b>Status: </b>
                <Dropdown id="status" value={status} options={statusOptions} onChange={handleStatusChange} placeholder="Select status" />
              </div>
              <div style={{margin:"10px"}}>
              <b>Vaš komentar: </b>
              <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={7} cols={140} />
              </div>
              <Button label="Potrdi" icon="pi pi-check" onClick={addResponse} autoFocus style={{margin:"10px"}} />
            </div>
          </Dialog>
        </div>
      </>
    );
  }
  