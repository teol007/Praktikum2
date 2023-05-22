import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { db } from "../../../Config/Firebase";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";

export default function QuestionsInicialization(): JSX.Element {
	const [, setQuestions] = useAtom(questionsDBAtom);

	useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Questions"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
      const data: QuestionWithId[] = snapshot.docs.map((doc): QuestionWithId => {
        return {
          id: doc.id,
          customerEmail: doc.data().customerEmail,
          description: doc.data().description,
          relatesToQuestionId: doc.data().relatesToQuestionId,
          lawField: doc.data().lawField,
          created: doc.data().created,
          closed: doc.data().closed
        }
      });
      setQuestions(data);
    }, (error) => {
      console.error(error)
    });

    return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
  }, [setQuestions]);


  return (
		<></>
  );
}
