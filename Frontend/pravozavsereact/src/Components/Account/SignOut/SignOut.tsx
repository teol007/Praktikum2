import React, { useRef } from "react";
import { Button } from "primereact/button";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "../../../Config/Firebase";
import { Toast } from 'primereact/toast';

export default function SignOut(): JSX.Element {
  const toast = useRef<Toast>(null);
  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
      showSuccess();
    } catch (error) {
      showError('Neuspešno', 'Odjava neuspešna');
      console.log(error);
    }
  }

  const showSuccess = (title: string = 'Uspešno', description: string = 'Odjava uspešna') => {
    toast.current?.show({severity:'success', summary: title, detail: description, life: 3000});
  }

  const showError = (title: string = 'Napaka', description: string = 'Prišlo je do napake') => {
    toast.current?.show({severity:'error', summary: title, detail: description, life: 3000});
  }

  return (
    <>
      <Toast ref={toast} />
      <Button onClick={logOut} severity="danger" label="Odjava" icon="pi pi-user" className="w-full" />
    </>
  );
}

