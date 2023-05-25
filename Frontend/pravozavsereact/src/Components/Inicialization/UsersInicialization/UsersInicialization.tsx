import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { db } from "../../../Config/Firebase";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";

export default function UsersInicialization(): JSX.Element {
	const [, setAtom] = useAtom(usersDBAtom);

	useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
      const data: UserCustomInfo[] = snapshot.docs.map((doc): UserCustomInfo => {
        return {
          fullName: doc.data().fullName, 
          academicTitle: doc.data().academicTitle, 
          email: doc.data().email, 
          group: doc.data().group,
          lawFields: doc.data().lawFields,
          inactive: doc.data().inactive,
          uid: doc.data().uid,
        }
      });
      setAtom(data);
    }, (error) => {
      console.warn(error)
    });

    return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
  }, [setAtom]);


  return (
		<></>
  );
}
