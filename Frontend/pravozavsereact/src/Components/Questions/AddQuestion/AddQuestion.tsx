import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { Timestamp } from "@firebase/firestore";
import { Question } from "../../../Modules/Interfaces/Question";
import { useNavigate } from "react-router";
import { MultiSelect } from "primereact/multiselect";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";


interface Category {
    name: string; 
    key: string;
}

export default function AddQuestion(): JSX.Element {
    const [lawFields, setLawFields] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();

        try {
            const newQuestion: Question = {
                created: Timestamp.now(),
                customerEmail: email,
                description: description,
                relatesToQuestionId: null, //! TODO, ce uporabnik vpise id prejsnjega vprasanja, ga dodaj sem
                lawFields: lawFields,
                closed: false,
            }

            await addDoc(collection(db, "Questions"), newQuestion);

            setLawFields([]);
            setEmail('');
            setDescription('');
            navigate("/oNas")
        } catch (error) {
            console.error(error);
        }
    }

    const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
    'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

    const categories: Category[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([categories[1]]);

    const onCategoryChange = (e: CheckboxChangeEvent) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked)
            _selectedCategories.push(e.value);
        else
            _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

        setSelectedCategories(_selectedCategories);
    };

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
            <MultiSelect value={lawFields} onChange={(e) => setLawFields(e.value)} options={lawFieldsArray} 
            placeholder="Izberi pravno področje problema" className="w-full md:w-14rem" required />
            <small id="opis-help">
                    Izberite pravno področje vašega problema
            </small>  <br /> <br />
        </div>
        <br />

        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories.some((item) => item.key === category.key)} />
                            <label htmlFor={category.key} className="ml-2">
                                {category.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>

        <Button label="Pošlji vprašanje" className="w-full" severity="success" raised />
      
    </form>
    </div>
  );
}

