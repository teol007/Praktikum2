import React, { useEffect, useState } from "react";
import { Question } from "../../../Modules/Interfaces/Question";
import { db } from "../../../Config/Firebase";
import { getDocs, collection } from "@firebase/firestore";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TestUseOfFirestore(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    const questionsCollectionRef = collection(db, 'Questions');
    const getQuestions = async () => {
      try {
        const data = await getDocs(questionsCollectionRef); //more bit await, da počaka da ta asinhrona funkcija vrne odgovor
        
        const questionsData: Question[] = data.docs.map((doc): Question => {
          return {
            id: doc.id,
            customerEmail: doc.data().customerEmail,
            description: doc.data().description,
            lawField: doc.data().lawField,
            created: doc.data().created,
          }
        });
        
        setQuestions(questionsData);
      } catch (error) {
        console.error(error);
      }
    }

    getQuestions();
  }, []);
  return (
    <>
      <h2>Izpis vprašanj</h2>
      <DataTable value={questions} tableStyle={{ minWidth: '50rem' }} stripedRows>
        <Column field="id" header="Id" />
        <Column field="customerEmail" header="Email" sortable />
        <Column field="description" header="Opis pravnega problema" sortable />
        <Column field="lawField" header="Pravno področje" sortable />
      </DataTable>
    </>
  );
}

