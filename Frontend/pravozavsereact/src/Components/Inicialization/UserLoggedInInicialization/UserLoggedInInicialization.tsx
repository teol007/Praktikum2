import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAtom } from "jotai";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";

export default function UserLoggedInInicialization(): JSX.Element {
  const [, setLoggedInUser] = useAtom(userAuthentication);
  const auth = getAuth();

  useEffect(() => {
    let unsubscribeDbListener: Unsubscribe|undefined;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        /* const getUserData = async () => {
          const currentUserDbRef = doc(db, 'Users', user.uid);
          const userDataSnapshot = await getDoc(currentUserDbRef);

          if (!userDataSnapshot.exists()) {
            console.log('Unknown user');
            setLoggedInUser(undefined);
            return;
          }

          const currentUserData: UserCustomInfo = {
            fullName: userDataSnapshot.data().fullName,
            academicTitle: userDataSnapshot.data().academicTitle,
            email: userDataSnapshot.data().email,
            group: userDataSnapshot.data().group,
            lawFields: userDataSnapshot.data().lawFields,
            inactive: userDataSnapshot.data().inactive,
            uid: userDataSnapshot.data().uid
          }
          setLoggedInUser(currentUserData);
        }
        getUserData(); */

        unsubscribeDbListener = onSnapshot(doc(db, 'Users', user.uid), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
          if(!snapshot.exists()) {
            console.log('Unknown user');
            setLoggedInUser(undefined);
            return;
          }

          const currentUser: UserCustomInfo = {
            fullName: snapshot.data().fullName,
            academicTitle: snapshot.data().academicTitle,
            email: snapshot.data().email,
            group: snapshot.data().group,
            lawFields: snapshot.data().lawFields,
            inactive: snapshot.data().inactive,
            uid: snapshot.id
          }
          setLoggedInUser(currentUser);
        }, (error) => {
          console.warn(error)
        });
      } else {
        setLoggedInUser(undefined);
      }
    }, (error) => {
      console.warn(error);
    });

    return () => { //To nujno more bit drugace bodo klici v neskoncnost pri onAuthStateChanged()!
      if(unsubscribeDbListener)
        unsubscribeDbListener(); 
        
      unsubscribe();
    };
  }, [auth, setLoggedInUser]);


  return (
    <></>
  );
}
