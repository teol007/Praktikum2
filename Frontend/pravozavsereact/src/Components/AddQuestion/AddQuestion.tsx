import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { Timestamp } from "@firebase/firestore";

export default function AddQuestion(): JSX.Element {
    //const [lawField, setLawField] = useState(null);
    const [lawField, setLawField] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        console.log(email);
        console.log(lawField);
        console.log(description);
        

        try {
            const docRef = await addDoc(collection(db, "Questions"), {
                created: Timestamp.now(),
                customerEmail: email,
                description: description,
                lawField: lawField,
              });
              console.log("uspelo je! :D"); //za testiranje - will delete later
        } catch (error) {
            console.log("ni uspelo :(");
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
                <InputText id="email" aria-describedby="email-help" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <small id="email-help">
                    Vpišite E-mail, na katerega želite prejeti odgovor.
                </small> <br /> <br />
            </div>
        </div> <br />

        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2"> <br />
                <label htmlFor="opis">Opis pravnega problema</label> <br />
                <InputTextarea id="opis" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} cols={100} /> <br />
                <small id="opis-help">
                    Tukaj opišite svoj pravni problem.
                </small> <br /> <br />
            </div>
        </div> <br />

        <div className="card flex justify-content-center"> <br /> <br />
            <label htmlFor="opis">Pravno področje</label>
            <Dropdown value={lawField} onChange={(e) => setLawField(e.value)} options={lawFieldsArray} 
            placeholder="Izberi pravno področje problema" className="w-full md:w-14rem" />
            <small id="opis-help">
                    Izberite pravno področje vašega problema
            </small>  <br /> <br />
        </div>
        <br />

        <button className="btn btn-success">Pošlji vprašanje</button>

        
    </form>
    

        
    </div>
  );
}

