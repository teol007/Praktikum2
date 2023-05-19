import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { UserCustomInfo, Group } from "../../../Modules/Interfaces/UserCustomInfo";


export interface QuestionDetailsProps{
  question: QuestionWithId;
}

const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

export default function QuestionDetails(props: QuestionDetailsProps): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState(false);
    const [newLawField, setNewLawField] = useState(props.question.lawField)
    const [authors, setAuthors] = useState<UserCustomInfo[]>([]);
    
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
    
      const shrani = (e: React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        if(newLawField)
          updateLawField(newLawField);
        setShowEdit(false);
      }

      useEffect(() => {
        const unsubscribeAuthors = onSnapshot(collection(db, "Users"), (snapshot) => {
          const usersData: UserCustomInfo[] = snapshot.docs.map((doc): UserCustomInfo => {
            return {
              fullName: doc.data().fullName,
              academicTitle: doc.data().academicTitle,
              email: doc.data().email,
              group: doc.data().group, 
              lawFields: doc.data().lawFields,
              uid: doc.data().uid
            }
          });
          const justAuthors = usersData.filter((user) => (user.group === Group.Author));
          setAuthors(justAuthors);
        }, (error) => {
          console.error(error)
        });
    
        return () => {unsubscribeAuthors()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
      }, []);
      
   


    return (
        <div className="flex justify-content-center">
            <Button label="Podrobnosti" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
            <Dialog header="Podrobnosti vprašanja" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            
                <div>
                    <p><b>Avtor vprašanja: </b>{props.question.customerEmail}</p>
                    <p><b>Pravno področje: </b>{props.question.lawField}</p>
                    {showEdit ? 
                        <div>
                        <Dropdown value={newLawField} options={lawFieldsArray} onChange={handleSelectLawField} placeholder="Izberi pravno področje problema"  className="w-full md:w-14rem" filter required />
                        <Button label="shrani" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={shrani} />
                        </div> : <Button label="Uredi pravno področje" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setShowEdit(true)} />
                    }
                    <p><b>Postavljeno vprašanje: </b>{props.question.description}</p>
                    <p><b>Dodeljen avtor odgovora: </b>{(authors.find((author) => (author.uid === props.question.selectedRespondentUid))?.fullName)??'Ni dodeljenega avtorja za odgovor na vprašanje'}</p>
                </div>
            
            </Dialog>
        </div>
    )
}
        