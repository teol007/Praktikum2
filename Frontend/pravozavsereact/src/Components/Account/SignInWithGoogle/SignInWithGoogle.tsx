import React, { useRef } from "react";
import { Button } from "primereact/button";
import { signInWithPopup } from "@firebase/auth";
import { firebaseAuth, firebaseAuthGoogleProvider } from "../../../Config/Firebase";
import { Toast } from 'primereact/toast';

export default function SignInWithGoogle(): JSX.Element {
  const toast = useRef<Toast>(null);
  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, firebaseAuthGoogleProvider);
      showSuccess();
    } catch (error) {
      showError('Neuspešno', 'Prijava neuspešna');
      console.log(error);
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
      <Button onClick={signUpWithGoogle} severity="warning" label="Prijava z Google računom" icon="pi pi-user" className="w-full" />
    </>
  );
}

