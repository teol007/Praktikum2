import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAtom } from "jotai";
import { db } from "../../../Config/Firebase";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { userAuthentication } from "../../../Atoms/UserAuthentication";

export default function AnswersInicialization(): JSX.Element {
  const [user] = useAtom(userAuthentication);
	const [, setAtom] = useAtom(answersDBAtom);

	useEffect(() => {
    if (user)
    {
      const unsubscribe = onSnapshot(collection(db, "Answers"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
        const data: AnswerWithId[] = snapshot.docs.map((doc): AnswerWithId => {
          return {
            id: doc.id, 
            questionId: doc.data().questionId, 
            authorUid: doc.data().authorUid, 
            authorAssigned: doc.data().authorAssigned,
            tags: doc.data().tags, 
            answered: doc.data().answered, 
            responses: doc.data().responses, 
            published: doc.data().published,
            fileUrl: doc.data().fileUrl
          }
        });
        setAtom(data);
      }, (error) => {
        console.warn(error)
      });

      return () => {unsubscribe()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
    }
  }, [setAtom, user]);

  return (
		<></>
  );
}
