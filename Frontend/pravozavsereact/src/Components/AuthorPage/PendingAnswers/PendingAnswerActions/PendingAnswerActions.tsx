import React, { useState } from "react";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import AnswerToEvaluateDetails from "../../DisplayAnswersToEvaluate/AnswerToEvaluateDetails/AnswerToEvaluateDetails";
import { FileUpload, FileUploadBeforeSendEvent, FileUploadBeforeUploadEvent, FileUploadHandlerEvent } from 'primereact/fileupload';
import { fileStorage } from "../../../../Config/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { file } from "@babel/types";
import FileUploadArea from "../../../Answer/FileUploadArea/FileUploadArea";

interface AnswerProps {
  answer: AnswerWithId;
}

export default function PendingAnswerActions(props: AnswerProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [answerTags, setAnswerTags] = useState<string[]>([]);
  
  return (
    <>
      <AnswerToEvaluateDetails answer={props.answer} />
      <Button label="Oddaj" icon="pi pi-file" className="p-button p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
      
      <Dialog header="Oddaja" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <FileUploadArea answer={props.answer} />
      </Dialog>
    </>
  );
}
