import React, { useEffect } from "react";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import { db } from "../../../Config/Firebase";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import { organizationsDBAtom } from "../../../Atoms/OrganizationsDBAtom";
import { SettingsOrganizationDoc, SettingsOrganizationDocWithId } from "../../../Modules/Interfaces/OrganizationsDocs";
import { settingsOrganizationDocId } from "../../../Config/OrganizationDocuments";

const createMainOrganizationDocumentId = async () => {  
  try {
    const mainOrganizationDocument: SettingsOrganizationDoc = {
      autoAssignQuestions: false,
      autoSendAnswers: false
    };
    await setDoc(doc(db, "Organizations/"+settingsOrganizationDocId), mainOrganizationDocument);
  } catch (error) {
    console.warn(error);
  }
}

export default function OrganizationsInicialization(): JSX.Element {
  const [user] = useAtom(userAuthentication);
	const [, setOrganizations] = useAtom(organizationsDBAtom);

	useEffect(() => {
    if(user) 
    {
      const unsubscribe = onSnapshot(doc(db, "Organizations/"+settingsOrganizationDocId), async (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
        const document = snapshot;
        if(!document.exists()){
          await createMainOrganizationDocumentId();
        }

        const data: SettingsOrganizationDocWithId = {
            id: document.id,
            autoAssignQuestions: document.data()?.autoAssignQuestions,
            autoSendAnswers: document.data()?.autoAssignQuestions,
        };
        setOrganizations(data);
      }, (error) => {
        console.warn(error)
      });

      return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
    }
  }, [setOrganizations, user]);


  return (
		<></>
  );
}
