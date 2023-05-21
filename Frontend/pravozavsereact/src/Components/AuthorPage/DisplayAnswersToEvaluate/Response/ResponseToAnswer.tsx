import React, { useState } from "react";
import { Button } from "primereact/button";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

export interface ResponseProps{
  answer: AnswerWithId
}

export default function ResponseToAnswer(props: ResponseProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string>('');

  const footerContent = (
      <div>
          <Button label="Potrdi" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
      </div>
  );

  return (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Dobro" severity="success" icon="pi pi-thumbs-up"  size="small" style={{width: '100%', margin: '1px'}}  />
        <Button label="Slabo" severity="warning" icon="pi pi-thumbs-down" size="small" style={{width: '100%', margin: '1px'}} onClick={() => setVisible(true)}   />
        <Button label="Zelo slabo" severity="danger" icon="pi pi-thumbs-down" size="small" style={{width: '100%', margin: '1px'}} onClick={() => setVisible(true)} />
        <div className="card flex justify-content-center">
            <Dialog header="Komentar na odgovor" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} footer={footerContent}>
              <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={7} cols={140} />
            </Dialog>
        </div>
    </div>
  );
}