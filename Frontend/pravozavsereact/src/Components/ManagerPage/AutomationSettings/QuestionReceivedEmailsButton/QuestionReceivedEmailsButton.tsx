import React from "react";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import { confirmDialog } from "primereact/confirmdialog";
import { updateDoc, doc } from "firebase/firestore";
import { useAtom } from "jotai";
import { settingsOrganizationsDBAtom } from "../../../../Atoms/OrganizationsDBAtom";
import { db } from "../../../../Config/Firebase";
import { settingsOrganizationDocId } from "../../../../Config/OrganizationDocuments";

export default function QuestionReceivedEmailsButton(): JSX.Element {
  const [mainOrganizationDocument] = useAtom(settingsOrganizationsDBAtom);
  const autoSendQuestionReceived = mainOrganizationDocument?.autoSendQuestionReceived;

  const confirmChangeAutoAssignQuestions = (message: JSX.Element, value: boolean) => {
    confirmDialog({
      header: 'Potrditev',
      message: message,
      icon: 'pi pi-exclamation-triangle',
      async accept() {
        try {
          await updateDoc(doc(db, "Organizations/"+settingsOrganizationDocId), {autoSendQuestionReceived: value});
        } catch (error) {
          console.warn(error);
        }
      },
    });
  };

  const handleChange = (e: ToggleButtonChangeEvent) => {
    if(e.value)
      confirmChangeAutoAssignQuestions(<>Ali res želiš <strong>vklopiti</strong> avtomatsko potrditev stranki o prejetem vprašanju?</>, e.value);
    else
      confirmChangeAutoAssignQuestions(<>Ali res želiš <strong>izklopiti</strong> avtomatsko potrditev stranki o prejetem vprašanju?</>, e.value);
  }

  return (
    <>
      <ToggleButton onLabel="Avtomatska potrditev stranki o prejetem vprašanju" offLabel="Stranka ne bo avtomatsko obveščena o prejetem vprašanju" onIcon="pi pi-eject" offIcon="pi pi-inbox" checked={autoSendQuestionReceived} onChange={handleChange} className="w-9rem" />
    </>
  );
}
