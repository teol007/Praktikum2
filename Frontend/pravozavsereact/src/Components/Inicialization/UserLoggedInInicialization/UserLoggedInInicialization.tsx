import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAtom } from "jotai";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";

export default function UserLoggedInInicialization(): JSX.Element {
  const [, setLoggedInUser] = useAtom(userAuthentication)

  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUserData = async () => {
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

        getUserData();
      } else {
        setLoggedInUser(undefined);
      }
  }, (error)=>{
    console.warn(error);
  });


  return (
    <></>
  );
}
