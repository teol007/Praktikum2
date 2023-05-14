import React, { useState } from "react";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import SignOut from "./SignOut/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../Config/Firebase";


export default function Account(): JSX.Element {
  const [register, setRegister] = useState<boolean>(false);
  const [user] = useAuthState(firebaseAuth);

  if(user)
  {
    return (
      <>
        <br />
        <h2>Pozdravljen {user.displayName}!</h2>
        <SignOut />
      </>
    );
  }

  if(register)
  {
    return (
      <>
        <br />
        <h2>Registracija</h2>
        <SignUp setRegister={setRegister} />
      </>
    );
  }

  return (
    <>
      <br />
      <h2>Prijava</h2>
      <SignIn setRegister={setRegister} />
    </>
  );
}