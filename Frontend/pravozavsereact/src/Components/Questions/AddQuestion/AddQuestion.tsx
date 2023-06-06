import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { Timestamp } from "@firebase/firestore";
import { Question } from "../../../Modules/Interfaces/Question";
import { MultiSelect } from "primereact/multiselect";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Card } from "primereact/card";
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

export default function AddQuestion(): JSX.Element {
    const [lawFields, setLawFields] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [checkboxes, setCheckboxes] = useState<string[]>([]);
    const toast = useRef<Toast>(null);

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        try {
            const newQuestion: Question = {
                created: Timestamp.now(),
                customerEmail: email,
                description: description,
                relatesToQuestionId: null,
                lawFields: lawFields,
                closed: false,
            }
            await addDoc(collection(db, "Questions"), newQuestion);
            setLawFields([]);
            setEmail('');
            setDescription('');
            toast.current?.show({ severity: 'success', summary: 'Vprašanje poslano', detail: 'Hvala, prejeli smo Vaše vprašanje!', sticky: true });
        } catch (error) {
            console.error(error);
        }
    }

    const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
    'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

    const onCheckboxChange = (e: CheckboxChangeEvent) => {
        let _checkboxes = [...checkboxes];
        if (e.checked)
            _checkboxes.push(e.value);
        else
            _checkboxes.splice(_checkboxes.indexOf(e.value), 1);
        setCheckboxes(_checkboxes);
    }

  return (
    <div className="">
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card title={<>Vprašalnik za pravne probleme</>} footer={<></>} style={{ margin: '20px', /* width: '500px' */ }}>
            <p>Tukaj lahko postavite svoje vprašanje, ki zadeva vaš pravni problem oziroma dilemo.</p>
            <Divider />
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className=" flex justify-content-center">
                                <div className="flex flex-column gap-2"> <br />
                                    <b><label htmlFor="email">E-mail</label><br /></b>
                                    <InputText id="email" aria-describedby="email-help" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: '300px'}} /><br />
                                    <small id="email-help">
                                        Vpišite e-mail, na katerega želite prejeti odgovor.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className=" flex justify-content-center"> <br />
                                <b><label htmlFor="opis">Pravno področje</label><br /> </b>
                                <MultiSelect value={lawFields} onChange={(e) => setLawFields(e.value)} options={lawFieldsArray} 
                                placeholder="Izberi pravno področje problema" filter maxSelectedLabels={2} className="w-full md:w-14rem" style={{width: '300px'}} required /> <br />
                                <small id="opis-help">
                                    Izberite pravno področje vašega problema.
                                </small>  <br /> <br />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" flex justify-content-center">
                            <div className="flex flex-column gap-2"> <br />
                                <b><label htmlFor="opis">Opis pravnega problema</label></b> <br />
                                <InputTextarea id="opis" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} cols={125} required /> <br />
                                <small id="opis-help">
                                    Tukaj opišite svoj pravni problem.
                                </small> <br /> <br />
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="flex align-items-center">
                                <label htmlFor="emailcheck" className="ml-2">
                                    <p><b>Ali ste preverili svoj e-mail naslov?</b></p>
                                    <p>Prosimo, da ponovno preverite pravilni zapis vašega elektronskega naslova, da vam bomo 
                                    lahko zanesljivo posredovali naše mnenje.</p>
                                </label>
                                <Checkbox inputId="emailcheck" name="questionChecks" value="EmailCheck" onChange={onCheckboxChange} 
                                checked={checkboxes.includes('EmailCheck')} required />
                                <p>Preveril sem e-mail naslov.</p>
                            </div>
                            <Divider />
                            <div className="flex align-items-center">
                                <label htmlFor="privacycheck" className="ml-2">
                                    <p><b>Politika zasebnosti spletnega portala Pravo za vse</b></p>
                                    <p> Ali se strinjate s politiko zasebnosti spletnega portala Pravo za vse, dostopno na: 
                                    <a href="https://www.pravozavse.si/politika-zasebnosti/"> https://www.pravozavse.si/politika-zasebnosti/</a>?</p>
                                </label>
                                <Checkbox inputId="privacycheck" name="questionChecks" 
                                value="Privacy" onChange={onCheckboxChange} 
                                checked={checkboxes.includes('Privacy')} required />
                                <p>Strinjam se s politiko zasebnosti.</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="flex align-items-center">
                                <label htmlFor="emailusagecheck" className="ml-2">
                                    <p><b>Uporaba E-mail računa</b></p>
                                    <p>Ali se strinjate, da Pravo za vse uporablja vaš E-mail račun za namene obveščanja o odgovoru na 
                                    Vaše pravno vprašanje?</p>
                                </label>
                                <Checkbox inputId="emailusagecheck" name="questionChecks" 
                                value="EmailUsage" onChange={onCheckboxChange} 
                                checked={checkboxes.includes('EmailUsage')} required />
                                <p>Strinjam se z uporabo e-mail naslova.</p>
                            </div>
                            <Divider />
                            <div className="flex align-items-center">
                                <label htmlFor="toscheck" className="ml-2">
                                    <p><b>Splošni pogoji spletnega portala Pravo za vse</b></p>
                                    <p>Ali se strinjate s splošnimi pogoji spletnega portala Pravo za vse, dostopnimi na: 
                                    <a href="https://www.pravozavse.si/splosni-pogoji/"> https://www.pravozavse.si/splosni-pogoji/</a>?</p>
                                </label>
                                <Checkbox inputId="toscheck" name="questionChecks" 
                                value="TermsOfService" onChange={onCheckboxChange} 
                                checked={checkboxes.includes('TermsOfService')} required />
                                <p>Strinjam se s splošnimi pogoji.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Toast ref={toast} />
                <Button label="Pošlji vprašanje" className="w-full" severity="success" raised />
            </form>
          </Card>
        </div>
    </div>
  );
}

