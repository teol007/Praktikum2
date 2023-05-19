import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { questionsAtom } from "../../Atoms/QuestionsAtom";
import { db } from "../../Config/Firebase";
import { QuestionWithId } from "../../Modules/Interfaces/Question";

export default function Inicialization(): JSX.Element {
	const [, setQuestions] = useAtom(questionsAtom);

	useEffect(() => {
    const unsubscribeQuestions = onSnapshot(collection(db, "Questions"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
      const questionsData: QuestionWithId[] = snapshot.docs.map((doc): QuestionWithId => {
        return {
          id: doc.id,
          customerEmail: doc.data().customerEmail,
          description: doc.data().description,
          lawField: doc.data().lawField,
          created: doc.data().created,
          selectedRespondentUid: doc.data().selectedRespondentUid
        }
      });
			console.log('a');
      setQuestions(questionsData);
    }, (error) => {
      console.error(error)
    });

    return () => {unsubscribeQuestions()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
  }, [setQuestions]);

  return (
		<></>
  );
}
  
