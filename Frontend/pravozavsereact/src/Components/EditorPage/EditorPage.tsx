import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { Question } from "../../Modules/Interfaces/Question";
import { Dropdown } from 'primereact/dropdown';

export default function EditorPage(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lawField, setLawField] = useState('');
  const [showContentLawField, setShowContentLawField] = useState<{ [key: string]: boolean }>({});
  const [showContentAttorneys, setShowContentAttorneys] = useState<{ [key: string]: boolean }>({});


  const handleClickLawField = (cardId: string) => {
    setShowContentLawField(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId]
    }));
  };

  const handleClickAttorneys = (cardId: string) => {
    setShowContentAttorneys(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId]
    }));
  };

  const lawFieldsArray = [
    'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
    'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'
  ];

  useEffect(() => {
    const questionsCollectionRef = collection(db, 'Questions');
    const getQuestions = async () => {
      try {
        const data = await getDocs(questionsCollectionRef);
        const questionsData: Question[] = data.docs.map((doc): Question => {
          return {
            id: doc.id,
            customerEmail: doc.data().customerEmail,
            description: doc.data().description,
            lawField: doc.data().lawField,
            created: doc.data().created
          }
        });
        setQuestions(questionsData);
      } catch (error) {
        console.error(error);
      }
    }
    getQuestions();
    }, []);

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (questionId: string) => (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Uredi področje" icon="pi pi-pencil" className="p-button-outlined p-button-primary" onClick={() => handleClickLawField(questionId)}/>
            {showContentLawField[questionId] &&
                <div className="card flex justify-content-center"> <br />
                    <label>Spremeni pravno področje</label>
                    <Dropdown value={lawField} onChange={(e) => setLawField(e.value)} options={lawFieldsArray}  placeholder="Izberi pravno področje problema"  className="w-full md:w-14rem" />
                </div>
            }
           
            <br />

            <Button label="Dodeli odvetniku" icon="pi pi-check"  onClick={() => handleClickAttorneys(questionId)} />
            {showContentAttorneys[questionId] &&
                <div className="card flex justify-content-center"> <br />
                    <label>Izberi odvetnika</label>
                    <Dropdown value={lawField} onChange={(e) => setLawField(e.value)} options={lawFieldsArray}  placeholder="Izberi odvetnika"  className="w-full md:w-14rem" />
                </div>
            }
        </div>
    );
    return (
     <div className="container">
        <div className="row">
        {questions.map(question => (
            <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
                <Card title={question.lawField} subTitle={question.customerEmail} footer={footer(question.id)} header={header}  className="md:w-25rem">
                <p className="m-0">{question.description}</p>
                </Card>
            </div>
        ))}
        </div>
     </div>
    );
}