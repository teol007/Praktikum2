import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { db } from "../../../Config/Firebase";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import { userAuthentication } from "../../../Atoms/UserAuthentication";

export default function UsersInicialization(): JSX.Element {
  const [user] = useAtom(userAuthentication);
	const [, setUsers] = useAtom(usersDBAtom);

	useEffect(() => {
    if(user) 
    {
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
        setUsers(data);
      }, (error) => {
        console.warn(error)
      });

      return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
    }
  }, [setUsers, user]);


  return (
		<></>
  );
}
