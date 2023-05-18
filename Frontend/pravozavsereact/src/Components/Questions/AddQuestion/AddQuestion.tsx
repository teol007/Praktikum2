import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { Timestamp } from "@firebase/firestore";
import { Question } from "../../../Modules/Interfaces/Question";

export default function AddQuestion(): JSX.Element {
    const [lawField, setLawField] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        console.log(email);
        console.log(lawField);
        console.log(description);

        try {
            const newQuestion: Question = {
                created: Timestamp.now(),
                customerEmail: email,
                description: description,
                lawField: lawField,
                selectedRespondentUid: ''
            }

            await addDoc(collection(db, "Questions"), newQuestion);

            setLawField('');
            setEmail('');
            setDescription('');
            console.log("uspelo je! :D"); //za testiranje - will delete later
        } catch (error) {
            console.error(error);
        }
    }

    const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
    'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

  return (
    <div className="container">

    <h2>Vprašalnik</h2> <br />

    <p>Tukaj lahko postavite svoje vprašanje, ki zadeva vaš pravni problem oziroma dilemo.</p> <br />

    <form onSubmit={handleSubmit}>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2"> <br />
                <label htmlFor="email">E-mail</label><br />
                <InputText id="email" aria-describedby="email-help" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <small id="email-help">
                    Vpišite E-mail, na katerega želite prejeti odgovor.
                </small> <br /> <br />
            </div>
        </div> <br />

        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2"> <br />
                <label htmlFor="opis">Opis pravnega problema</label> <br />
                <InputTextarea id="opis" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} cols={100} required /> <br />
                <small id="opis-help">
                    Tukaj opišite svoj pravni problem.
                </small> <br /> <br />
            </div>
        </div> <br />

        <div className="card flex justify-content-center"> <br /> <br />
            <label htmlFor="opis">Pravno področje</label>
            <Dropdown value={lawField} onChange={(e) => setLawField(e.value)} options={lawFieldsArray} 
            placeholder="Izberi pravno področje problema" className="w-full md:w-14rem" required />
            <small id="opis-help">
                    Izberite pravno področje vašega problema
            </small>  <br /> <br />
        </div>
        <br />

        <Button label="Pošlji vprašanje" className="w-full" severity="success" raised />
      
    </form>
    </div>
  );
}

