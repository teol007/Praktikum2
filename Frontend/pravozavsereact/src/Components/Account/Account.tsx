import React from "react";
import SignOut from "./SignOut/SignOut";
import SignInWithGoogle from "./SignInWithGoogle/SignInWithGoogle";
import { useAtom } from "jotai";
import { userAuthentication } from "../../Atoms/UserAuthentication";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import EditAccount from "./EditAccount/EditAccount";
import { userGroupToSlovenian } from "../../Modules/Functions/UserGroupTranslate";

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

  if (loggedInUser) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card title={<>Pozdravljeni, {loggedInUser.fullName}!</>} footer={<></>} style={{ margin: '20px', width: '500px' }}>
            <p><b>Ime in priimek:</b> {loggedInUser.fullName}</p>
            <p><b>Naziv:</b> {loggedInUser.academicTitle!=='' ? loggedInUser.academicTitle : <i>/</i>}</p>
            <p><b>Email:</b> {loggedInUser.email}</p>
            <p><b>Vloga:</b> {userGroupToSlovenian(loggedInUser.group)}</p>

            <div style={{marginBottom: '1em'}}><b>Pravna področja: </b>
              {loggedInUser.lawFields.map((field, index) => (
                <React.Fragment key={index}>
                  <Chip label={field} style={{ display: 'inline-block' }} />
                </React.Fragment>
              ))}
            </div>
            <EditAccount />
            <SignOut />

          </Card>
        </div>


      </>
    );
  }

  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card title="Prijava uporabnika" footer={<></>} style={{ margin: '20px', width: '400px' }}>
            
            <SignInWithGoogle />

          </Card>
        </div>


      </>
   
    
  );
}