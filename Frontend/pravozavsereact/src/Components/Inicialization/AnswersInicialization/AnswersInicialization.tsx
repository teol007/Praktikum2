import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { db } from "../../../Config/Firebase";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";

export default function AnswersInicialization(): JSX.Element {
	const [, setAtom] = useAtom(answersDBAtom);

	useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Answers"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
      const data: AnswerWithId[] = snapshot.docs.map((doc): AnswerWithId => {
        return {
          id: doc.id, 
          questionId: doc.data().questionId, 
          authorUid: doc.data().authorUid, 
          authorAssigned: doc.data().authorAssigned,
          title: doc.data().title,
          content: doc.data().content, 
          tags: doc.data().tags, 
          answered: doc.data().answered, 
          responses: doc.data().responses, 
          published: doc.data().published
        }
      });
      setAtom(data);
    }, (error) => {
      console.error(error)
    });

    return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
  }, [setAtom]);

  return (
		<></>
  );
}
