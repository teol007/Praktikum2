import React, { PropsWithChildren, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { toSlovenianDate, toSlovenianTime } from "../../../Modules/Functions/DateConverters";
import DisplayLawFields from "../DisplayLawFields/DisplayLawFields";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";


export interface QuestionDetailsProps{
  question: QuestionWithId;
  withPersonalData?: boolean;
}

const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

/**
 * withPersonalData?: boolean
 * @param props 
 * @returns button Podrobnosti, that shows question details
 */
export default function QuestionDetails(props: PropsWithChildren<QuestionDetailsProps>): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [selectedLawFields, setSelectedLawFields] = useState<string[]>(props.question.lawFields)

  const updateLawFields = async (questionLawFields: string[]) => {
    if(questionLawFields === props.question.lawFields)
      return;
  
    const questionRef = doc(db, "Questions", props.question.id);
    try {
      await updateDoc(questionRef, {
        lawFields: questionLawFields
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleSelectLawFields = (e: MultiSelectChangeEvent):void => {
    setSelectedLawFields([...e.target.value]);
  }
  
  const shrani = (e: React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    if(selectedLawFields)
      updateLawFields(selectedLawFields);
    setShowEdit(false);
  }


  return (
    <div className="flex justify-content-center">
      <Button label="Podrobnosti" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
      <Dialog header="Podrobnosti vprašanja" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} blockScroll={true} >
        <div>
          {props.withPersonalData && <p><b>Avtor vprašanja: </b>{props.question.customerEmail}</p>}
          {props.withPersonalData && <p><b>Datum nastanka: </b>{toSlovenianDate(props.question.created.toDate())} ob {toSlovenianTime(props.question.created.toDate())}</p>}
          <div style={{marginBottom: '1em'}}><b>Pravna področja: </b><DisplayLawFields lawFields={props.question.lawFields} /></div>
          {props.withPersonalData && <div style={{marginBottom: '1em'}}>
            {showEdit ? 
                <div>
                <MultiSelect value={selectedLawFields} options={lawFieldsArray} onChange={handleSelectLawFields} placeholder="Izberi pravno področje problema"  className="w-full md:w-14rem" display="chip" filter required />
                <Button label="shrani" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={shrani} />
                </div> : <Button label="Uredi pravno področje" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setShowEdit(true)} />
            }
          </div>}
          <p><b>Postavljeno vprašanje: </b>{props.question.description}</p>
          <p><b>Razrešeno: </b>{props.question.closed ? '\u2713' : 'X'}</p>
          {props.children && <div>Dodatne možnosti:<br />{props.children}</div>}
        </div>
      </Dialog>
    </div>
  )
}