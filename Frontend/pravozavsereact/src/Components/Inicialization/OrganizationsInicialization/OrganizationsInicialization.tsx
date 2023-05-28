import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { db } from "../../../Config/Firebase";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import { organizationsDBAtom } from "../../../Atoms/OrganizationsDBAtom";
import { OrganizationWithId } from "../../../Modules/Interfaces/Organizations";

export default function OrganizationsInicialization(): JSX.Element {
  const [user] = useAtom(userAuthentication);
	const [, setOrganizations] = useAtom(organizationsDBAtom);

	useEffect(() => {
    if(user) 
    {
      const unsubscribe = onSnapshot(collection(db, "Organizations"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
        const data: OrganizationWithId[] = snapshot.docs.map((doc): OrganizationWithId => {
          return {
            id: doc.id,
            autoAssignQuestions: doc.data().autoAssignQuestions,
            autoSendAnswers: doc.data().autoAssignQuestions,
          }
        });
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
