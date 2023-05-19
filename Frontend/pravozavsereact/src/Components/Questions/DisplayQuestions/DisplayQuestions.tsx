import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { useNavigate } from "react-router";

export default function DisplayQuestions(): JSX.Element {
    const [questions, setQuestions] = useState<QuestionWithId[]>([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        const questionsCollectionRef = collection(db, 'Questions');
        const getQuestions = async () => {
          try {
            const data = await getDocs(questionsCollectionRef); //more bit await, da počaka da ta asinhrona funkcija vrne odgovor
            
            const questionsData: QuestionWithId[] = data.docs.map((doc): QuestionWithId => {
              return {
                id: doc.id,
                customerEmail: doc.data().customerEmail,
                description: doc.data().description,
                lawField: doc.data().lawField,
                created: doc.data().created,
                selectedRespondentUid: doc.data().selectedRespondentUid
              }
            });
            
            setQuestions(questionsData);
          } catch (error) {
            console.error(error);
          }
        }
        getQuestions();
      }, []);

      const selectQuestionToAnswer = (questionId: string) => {
        console.log("hej");
        navigate("/odgovor/" + questionId);

      }

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Odgovori" icon="pi pi-check" />
            <Button label="Zavrni" icon="pi pi-times" className="p-button-outlined p-button-danger" />
        </div>
    );

    return (
          
      <div className="container">
        <div className="row">
          { questions.map(question => (
            <div key={question.id} className="col flex justify-content-center" style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
            <Card title={question.lawField} subTitle={question.customerEmail} footer={footer} header={header} className="md:w-25rem">
              <p className="m-0">{question.description}</p>
              <Button label="Test" icon="pi pi-check" onClick={() => selectQuestionToAnswer(question.id)} />
            </Card>
          </div>
          ))
          }
        </div>
      </div>
    )
}
