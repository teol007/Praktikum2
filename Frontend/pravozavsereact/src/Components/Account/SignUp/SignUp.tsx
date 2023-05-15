import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { firebaseAuth } from "../../../Config/Firebase";
import { Link } from "react-router-dom";
import { Toast } from 'primereact/toast';
import SignInWithGoogle from "../SignInWithGoogle/SignInWithGoogle";

interface Props {
  setRegister: (value: boolean) => void;
}

interface Uporabnik {
  email: string;
  password: string; 
}

const initialState: Uporabnik = {
  email: '',
  password: ''
};

export default function SignUp(props: Props): JSX.Element {
  const [uporabnik, setUporabnik] = useState<Uporabnik>(initialState);
  const toast = useRef<Toast>(null);

  const signUp = async () => {
    await createUserWithEmailAndPassword(firebaseAuth, uporabnik.email, uporabnik.password);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUporabnik((before) => {
      return {...before, [e.target.name]: e.target.value}
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    signUp().then(() => {
      showSuccess();
      setUporabnik({...initialState});
    }).catch((error) => {
      showError('Neuspešna registracija', 'Vzrok je lahko prekratko geslo (vsaj 6 znakov)');
      console.error(error);
    });
  }

  const showSuccess = (title: string = 'Uspešno', description: string = 'Registracija uspešna') => {
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
            <div className="text-900 text-3xl font-medium mb-3">Pozdravljeni</div>
            <span className="text-600 font-medium line-height-3">Že imate račun? </span>
            <Link to={'/racun'} onClick={() => props.setRegister(false)}>Prijava</Link>
          </div>
  
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="emailReg" className="block text-900 font-medium mb-2">Email: </label>
              <InputText onChange={handleChange} value={uporabnik.email} id="emailReg" name="email" type="email" placeholder="Email" className="w-full mb-3" required />
              <label htmlFor="passwordReg" className="block text-900 font-medium mb-2">Geslo: </label>
              <InputText onChange={handleChange} value={uporabnik.password} id="passwordReg" name="password" type="password" placeholder="Geslo" className="w-full mb-3" required />
    
              <Button label="Registriraj se" icon="pi pi-user" className="w-full" />
            </form>
            ali
            <br />
            <SignInWithGoogle />
          </div>
        </div>
      </div>
    </>
  );
}

