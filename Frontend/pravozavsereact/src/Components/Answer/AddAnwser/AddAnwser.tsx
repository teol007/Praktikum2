import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { useNavigate, useParams } from "react-router";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import QuestionDetailsReadOnly from "../../AuthorPage/DisplayQuestionsToAnswer/QuestionsToAnswerDetails/QuestionDetailsReadOnly";

export default function AddAnwser(): JSX.Element {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [answers] = useAtom(answersDBAtom);
    const [questions] = useAtom(questionsDBAtom);

    const navigate = useNavigate();

    const { questionId } = useParams();
    const qustionIdStr = String(questionId);

    const selectedQuestion = questions.find((question) => question.id === qustionIdStr);

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        const existingAnswer = answers.find((answer)=>(answer.questionId === qustionIdStr));

        try {
            if (existingAnswer){
                const answerRef = doc(db, "Answers", existingAnswer.id);
                await updateDoc(answerRef, {
                    anwsered:  Timestamp.now(),
                    content: content,
                    title: title
                });

                navigate("/avtor");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const goBack = () => {
        navigate("/avtor");
    }

    return (
        <div className="container">
            <h2 style={{marginTop: '1em'}}>Odgovor na vprašanje</h2> <br />
            <p>Podajte odgovor izbranemu pravnemu vprašanju.</p> <br />

            <div className="flex flex-wrap justify-content-end gap-2">
            <div style={{marginLeft: '3em', marginRight: '3em'}}>
            <QuestionDetailsReadOnly question={selectedQuestion!} /> <br />
            </div>
        </div>

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
                <Button label="Nazaj na vprašanja" className="w-full" onClick={() => goBack()} raised style={{marginLeft: "30px"}} />
            </form>
        </div>
    );
}
