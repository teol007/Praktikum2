import React from "react";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import { confirmDialog } from "primereact/confirmdialog";
import { updateDoc, doc } from "firebase/firestore";
import { useAtom } from "jotai";
import { settingsOrganizationsDBAtom } from "../../../../Atoms/OrganizationsDBAtom";
import { db } from "../../../../Config/Firebase";
import { settingsOrganizationDocId } from "../../../../Config/OrganizationDocuments";

export default function AutoAssignQuestionsButton(): JSX.Element {
  const [mainOrganizationDocument] = useAtom(settingsOrganizationsDBAtom);
  const isAutoAssignOn = mainOrganizationDocument?.autoAssignQuestions;

  const confirmChangeAutoAssignQuestions = (message: JSX.Element, value: boolean) => {
    confirmDialog({
      header: 'Potrditev',
      message: message,
      icon: 'pi pi-exclamation-triangle',
      async accept() {
        try {
          await updateDoc(doc(db, "Organizations/"+settingsOrganizationDocId), {autoAssignQuestions: value});
        } catch (error) {
          console.warn(error);
        }
      },
    });
  };

  const handleChange = (e: ToggleButtonChangeEvent) => {
    if(e.value)
      confirmChangeAutoAssignQuestions(<>Ali res želiš <strong>vklopiti</strong> avtomatsko dodeljevanje novih vprašanj avtorjem?</>, e.value);
    else
      confirmChangeAutoAssignQuestions(<>Ali res želiš <strong>izklopiti</strong> avtomatsko dodeljevanje novih vprašanj avtorjem?</>, e.value);
  }

  return (
    <>
      <ToggleButton onLabel="Avtomatsko dodeljevanje novih vprašanj" offLabel="Samo ročno dodeljevanje novih vprašanj" onIcon="pi pi-eject" offIcon="pi pi-inbox" checked={isAutoAssignOn} onChange={handleChange} className="w-9rem" />
    </>
  );
}
