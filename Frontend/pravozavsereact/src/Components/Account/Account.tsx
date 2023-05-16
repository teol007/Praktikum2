import React from "react";
import SignOut from "./SignOut/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../Config/Firebase";
import SignInWithGoogle from "./SignInWithGoogle/SignInWithGoogle";
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Account(): JSX.Element {
  const [user, loading, error] = useAuthState(firebaseAuth);

  if(loading)
  {
    return (
      <>
        <br />
        <ProgressSpinner />
        <SignOut />
      </>
    );
  }

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

  if(error)
  {
    return (
      <>
        <br />
        <h2>Prišlo je do težave</h2>
        <p>Poskusi ponovno</p>
        <SignInWithGoogle />
      </>
    );
  }

  return (
    <>
      <br />
      <h2>Prijava</h2>
      <SignInWithGoogle />
    </>
  );
}