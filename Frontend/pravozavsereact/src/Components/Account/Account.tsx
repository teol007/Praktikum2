import React from "react";
import SignOut from "./SignOut/SignOut";
import SignInWithGoogle from "./SignInWithGoogle/SignInWithGoogle";
import { useAtom } from "jotai";
import { userAuthentication } from "../../Atoms/UserAuthentication";


export default function Account(): JSX.Element {
  //const [user, loading, error] = useAuthState(firebaseAuth);
  const [loggedInUser] = useAtom(userAuthentication);

  /* if(loading)
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
  ); */

  if(loggedInUser)
  {
    return (
      <>
        <br />
        <h2>Pozdravljen {loggedInUser.fullName}!</h2>
        <SignOut />
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