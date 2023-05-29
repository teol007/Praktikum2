import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { db } from "../../../Config/Firebase";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { userAuthentication } from "../../../Atoms/UserAuthentication";

export default function QuestionsInicialization(): JSX.Element {
  const [user] = useAtom(userAuthentication);
	const [, setQuestions] = useAtom(questionsDBAtom);

	useEffect(() => {
    if(user) 
    {
      const unsubscribe = onSnapshot(collection(db, "Questions"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
        const data: QuestionWithId[] = snapshot.docs.map((doc): QuestionWithId => {
          return {
            id: doc.id,
            customerEmail: doc.data().customerEmail,
            description: doc.data().description,
            relatesToQuestionId: doc.data().relatesToQuestionId,
            lawFields: doc.data().lawFields,
            created: doc.data().created,
            closed: doc.data().closed
          }
        });
        setQuestions(data);
      }, (error) => {
        console.warn(error)
      });

      return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
    }
  }, [setQuestions, user]);


  return (
		<></>
  );
}
