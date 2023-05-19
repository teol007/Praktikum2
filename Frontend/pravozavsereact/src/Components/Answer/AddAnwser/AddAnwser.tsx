import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { collection, addDoc } from "firebase/firestore";
import { db, firebaseAuth } from "../../../Config/Firebase";
import { Answer } from "../../../Modules/Interfaces/Answer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";

export default function AddAnwser(): JSX.Element {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [user /*, loading, error */] = useAuthState(firebaseAuth);

    const { questionId } = useParams()
    const qustionIdStr = String(questionId)

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        const authorId = user?.uid;

        try {
            const newAnswer: Answer = {
                questionId: qustionIdStr,
                authorUid: authorId,
                title: title,
                content: content,
                answered: null,
                responses: [],
                published: null
            }
            await addDoc(collection(db, "Answers"), newAnswer);

            setTitle('');
            setContent('');
            console.log("uspelo je! :D");
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
