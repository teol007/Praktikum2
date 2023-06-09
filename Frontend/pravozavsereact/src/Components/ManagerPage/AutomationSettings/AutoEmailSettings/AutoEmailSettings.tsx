import React from "react";
import { useAtom } from "jotai";
import { settingsOrganizationsDBAtom } from "../../../../Atoms/OrganizationsDBAtom";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import { confirmDialog } from "primereact/confirmdialog";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Config/Firebase";
import { settingsOrganizationDocId } from "../../../../Config/OrganizationDocuments";

export default function AutoEmailSettings(): JSX.Element {
  const [settings] = useAtom(settingsOrganizationsDBAtom);
  if(!settings)
    return (<></>);

  const confirmChangeAutoSendAuthors = (message: JSX.Element, value: boolean) => {
    confirmDialog({
        header: 'Potrditev',
        message: message,
        icon: 'pi pi-exclamation-triangle',
        async accept() {
          try {
            await updateDoc(doc(db, "Organizations/"+settingsOrganizationDocId), {autoSendAuthors: value});
          } catch (error) {
            console.warn(error);
          }
        },
    });
  };

  const handleAutoSendAuthors = (e: ToggleButtonChangeEvent) => {
    if(e.value)
      confirmChangeAutoSendAuthors(<>Ali res želiš <strong>vklopiti</strong> avtomatsko email obveščanje avtorja?</>, e.value);
    else
      confirmChangeAutoSendAuthors(<>Ali res želiš <strong>izklopiti vso</strong> email obveščanje avtorja?</>, e.value);
  }

  const confirmChangeAutoSendAnswers = (message: JSX.Element, value: boolean) => {
    confirmDialog({
        header: 'Potrditev',
        message: message,
        icon: 'pi pi-exclamation-triangle',
        async accept() {
          try {
            await updateDoc(doc(db, "Organizations/"+settingsOrganizationDocId), {autoSendAnswers: value});
          } catch (error) {
            console.warn(error);
          }
        },
    });
  };

  const handleAutoSendAnswers= (e: ToggleButtonChangeEvent) => {
    if(e.value)
      confirmChangeAutoSendAnswers(<>Ali res želiš <strong>vklopiti</strong> avtomatsko pošiljanje odgovora stranki na email?</>, e.value);
    else
      confirmChangeAutoSendAnswers(<>Ali res želiš <strong>izklopiti</strong> avtomatsko pošiljanje odgovora stranki na email?<p style={{color: 'red'}}>To lahko privede do neposlanih odgovorov!</p></>, e.value);
  } 

  return (
    <>
      <ToggleButton onLabel="Avtomatsko obveščanje avtorjev" offLabel="Ne bo poslanih nobenih emailov avtorju" onIcon="pi pi-eject" offIcon="pi pi-inbox" checked={settings.autoSendAuthors} onChange={handleAutoSendAuthors} className="w-9rem" style={{marginLeft: '0.1em', marginRight: '0.1em'}} />
      <ToggleButton onLabel="Avtomatsko pošiljanje odgovora stranki" offLabel="Ne pošiljaj odgovora stranki" onIcon="pi pi-eject" offIcon="pi pi-inbox" checked={settings.autoSendAnswers} onChange={handleAutoSendAnswers} className="w-9rem" style={{marginLeft: '0.1em', marginRight: '0.1em'}} />
    </>
  );
}