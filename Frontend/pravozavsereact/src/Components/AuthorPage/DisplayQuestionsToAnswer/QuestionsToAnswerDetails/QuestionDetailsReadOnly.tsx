import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { toSlovenianDate, toSlovenianTime } from "../../../../Modules/Functions/DateConverters";

export interface QuestionDetailsProps{
  question: QuestionWithId;
}

export default function QuestionDetailsReadOnly(props: QuestionDetailsProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-content-center">
      <Button label="Podrobnosti" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
      <Dialog header="Podrobnosti vprašanja" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} blockScroll={true}>
        <div>
          <p><b>Avtor vprašanja: </b>{props.question.customerEmail}</p>
          <p><b>Datum nastanka: </b>{toSlovenianDate(props.question.created.toDate())} ob {toSlovenianTime(props.question.created.toDate())}</p>
          <p><b>Pravno področje: </b>{props.question.lawField}</p>
          <p><b>Postavljeno vprašanje: </b>{props.question.description}</p>
          <p><b>Razrešeno: </b>{props.question.closed ? '\u2713' : 'X'}</p>
        </div>
      </Dialog>
    </div>
  )
}