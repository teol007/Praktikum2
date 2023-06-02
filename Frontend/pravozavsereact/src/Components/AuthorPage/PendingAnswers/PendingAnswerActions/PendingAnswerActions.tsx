import React, { useState } from "react";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import FileUploadArea from "../../../Answer/FIles/FileUploadArea/FileUploadArea";
import AnswerDetails from "../../../Answer/AnswerDetails/AnswerDetails";
import SetTags from "../../../Answer/SetProperties/SetTags/SetTags";
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import FileDownloadButton from "../../../Answer/FIles/FileDownloadButton/FileDownloadButton";

interface AnswerProps {
  answer: AnswerWithId;
}

const toDo: MenuItem[] = [
  {label: 'Določi oznake'},
  {label: 'Oddaj datoteko'},
];

export default function PendingAnswerActions(props: AnswerProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  
  return (
    <>
      <AnswerDetails answer={props.answer} withPersonalData={true} editQuestionLawFields={true} />
      <Button label="Oddaj" icon="pi pi-file" className="p-button p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
      
      <Dialog header="Oddaja" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <Steps model={toDo} activeIndex={0} />
        <SetTags answer={props.answer} />
        <br />
        <Steps model={toDo} activeIndex={1} />
        <p style={{width: '100%', marginTop: '1em'}}><strong>Trenutno oddana datoteka: </strong>{props.answer.fileUrl!=='' ? <FileDownloadButton answer={props.answer} /> : <i>Datoteka ni oddana</i>}</p>
        <FileUploadArea answer={props.answer} />
      </Dialog>
    </>
  );
}
