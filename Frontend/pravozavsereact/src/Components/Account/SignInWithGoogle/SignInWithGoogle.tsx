import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { signInWithPopup } from "@firebase/auth";
import { firebaseAuth, firebaseAuthGoogleProvider } from "../../../Config/Firebase";
import { Toast } from 'primereact/toast';
import { getAdditionalUserInfo } from "firebase/auth";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SignInWithGoogle(): JSX.Element {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const signUpWithGoogle = async () => {
    setLoading(true);
    try {
      const logedInAccount = await signInWithPopup(firebaseAuth, firebaseAuthGoogleProvider);
      const newUser: boolean = getAdditionalUserInfo(logedInAccount)!.isNewUser; //it should always be defined
      setIsNewUser(newUser);
      showSuccess();
    } catch (error) {
      console.error(error);
      showError('Neuspešno', 'Prijava neuspešna');
      setLoading(false);
    }
  }

  const showSuccess = (title: string = 'Uspešno', description: string = 'Prijava uspešna') => {
    toast.current?.show({severity:'success', summary: title, detail: description, life: 3000});
  }

  const showError = (title: string = 'Napaka', description: string = 'Prišlo je do napake') => {
    toast.current?.show({severity:'error', summary: title, detail: description, life: 3000});
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-items-center justify-content-center">
          <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">Pozdravljeni nazaj</div>
            </div>
            <div>
              <p><strong>*Prijava je le za osebje organizacije Pravo za vse</strong></p>
              <Button onClick={signUpWithGoogle} severity="warning" label="Prijava z Google računom" icon="pi pi-user" className="w-full" />
              {loading ? 
                <><br /><strong>Avtentikacija:</strong><br /><ProgressSpinner style={{width: '3em', height: '3em'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /></>
                :<></>
              }
              {isNewUser &&
                <p style={{color: 'red'}}><strong>Počakajte</strong>, da vas prvič registriramo.<br />To lahko traja nekaj momentov.</p>
              }
            </div>
          </div>
        </div>
    </>
  );
}

