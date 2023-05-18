import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { collection, addDoc } from "firebase/firestore";
import { db, firebaseAuth } from "../../../Config/Firebase";
import { Timestamp } from "@firebase/firestore";
import { Question } from "../../../Modules/Interfaces/Question";
import { Answer } from "../../../Modules/Interfaces/Answer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";


export default function AddAnwser(): JSX.Element {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [user, loading, error] = useAuthState(firebaseAuth);

    const { questionId } = useParams()
    const qustionIdStr = String(questionId)

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();

        const authorId = user?.uid;//????
        //user?.providerId

        try {
            const newAnswer: Answer = {
                questionId: qustionIdStr,
                authorUid: authorId,//spremeni
                title: title,
                content: content,
                created: Timestamp.now(),
                published: null,
                responses: []
            }
            await addDoc(collection(db, "Answers"), newAnswer);//preveri da je prava tabela

            setTitle('');
            setContent('');
            console.log("uspelo je! :D"); //za testiranje - will delete later
        } catch (error) {
            console.error(error);
            console.log("ni uspelo");
        }
    }

  return (
    <div className="container">
        <h2>Odgovor na vprašanje</h2> <br />
        <p>Podajte odgovor izbranemu pravnemu vprašanju.</p> <br />

        <form onSubmit={handleSubmit}>
            <div className="card flex justify-content-center">
                <div className="flex flex-column gap-2"> <br />
                    <label htmlFor="title">Naslov</label><br />
                    <InputText id="title" aria-describedby="title-help" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
                    <small id="title-help">
                        Vpišite naslov odgovora na pravno vprašanje.
                    </small> <br /> <br />
                </div>
            </div> <br />

            <div className="card flex justify-content-center">
                <div className="flex flex-column gap-2"> <br />
                    <label htmlFor="opis">Odgovor na pravo vprašanje</label> <br />
                    <InputTextarea id="opis" value={content} onChange={(e) => setContent(e.target.value)} rows={3} cols={100} required /> <br />
                    <small id="opis-help">
                        V to polje vpišite vsebino odgovora na pravno vprašanje.
                    </small> <br /> <br />
                </div>
            </div> <br />

            <Button label="Odgovori na vprašanje" className="w-full" severity="success" raised />
        </form>
    </div>
  );
}
