import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { firebaseAuth } from "../../../Config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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

export default function SignIn(props: Props): JSX.Element {
  const [uporabnik, setUporabnik] = useState<Uporabnik>(initialState)
  const toast = useRef<Toast>(null);
  
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, uporabnik.email, uporabnik.password);
      showSuccess();
      setUporabnik({...initialState});
    } catch (error) {
      showError('Neuspešno', 'Prijava neuspešna');
      console.error(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUporabnik((before) => {
      return {...before, [e.target.name]: e.target.value}
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    signIn();
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
              <span className="text-600 font-medium line-height-3">Še nimate računa? </span>
              <Link to={'/racun'} onClick={() => props.setRegister(true)}>Ustvari račun!</Link>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="block text-900 font-medium mb-2">Email: </label>
                <InputText onChange={handleChange} value={uporabnik.email} id="email" name="email" type="email" placeholder="Email" className="w-full mb-3" required />

                <label htmlFor="password" className="block text-900 font-medium mb-2">Geslo: </label>
                <InputText onChange={handleChange} value={uporabnik.password} id="password" name="password" type="password" placeholder="Geslo" className="w-full mb-3" required />

                <div className="flex align-items-center justify-content-between mb-6">
                  <Link to={'/racun'}>Pozabljeno geslo?</Link>
                </div>

                <Button label="Prijavi se" icon="pi pi-user" className="w-full" />
              </form>
            </div>
          </div>
        </div>
    
    </>
  );
}

