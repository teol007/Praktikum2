import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";


export interface QuestionDetailsProps{
    question: QuestionWithId;
}

const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

export default function QuestionDetails(props: QuestionDetailsProps): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState(false);
    const [newLawField, setNewLawField] = useState(props.question.lawField)


    
    const updateLawField = async (questionLawField: String) => {
        if(questionLawField === props.question.lawField)
          return;
    
        const questionRef = doc(db, "Questions", props.question.id);
        try {
          await updateDoc(questionRef, {
            lawField: questionLawField
          });
        } catch (error) {
          console.error(error);
        }
      }
    
      const handleSelectLawField = (e: DropdownChangeEvent):void => {
        setNewLawField(e.target.value);
      }
    
      const ja = (e:any):void => {
        e.preventDefault();
        if(newLawField)
          updateLawField(newLawField);
        setShowEdit(false);
      }
      
   


    return (
        <div className="card flex justify-content-center">
            <Button label="Podrobnosti" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setVisible(true)} />
            <Dialog header="Podrobnosti vprašanja" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            {showEdit ? (
                <div>
                    <p><b>Avtor vprašanja: </b>{props.question.customerEmail}</p>
                    <p><b>Pravno področje: </b></p>
                    <div>
                    <Dropdown value={newLawField} options={lawFieldsArray} onChange={handleSelectLawField} placeholder="Izberi pravno področje problema"  className="w-full md:w-14rem" filter required />
                    <Button label="shrani" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={ja} />
                    </div>
                    
                    <p><b>Postavljeno vprašanje: </b>{props.question.description}</p>
                    <p><b>Dodeljen odvetnik: </b>{props.question.selectedRespondentUid}</p>
                </div>
               
            ):( 
                <div>
                    <p><b>Avtor vprašanja: </b>{props.question.customerEmail}</p>
                    <p><b>Pravno področje: </b>{props.question.lawField}</p>
                    <Button label="Uredi pravno področje" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setShowEdit(true)} />
                    <p><b>Postavljeno vprašanje: </b>{props.question.description}</p>
                    <p><b>Dodeljen odvetnik:</b>{props.question.selectedRespondentUid}</p>
                </div>
            )}
            </Dialog>
        </div>
    )
}
        