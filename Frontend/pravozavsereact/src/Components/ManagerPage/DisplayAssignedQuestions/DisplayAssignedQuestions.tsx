import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { toSlovenianDate, toSlovenianTime } from "../../../Modules/Functions/DateConverters";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { UserCustomInfo, Group } from "../../../Modules/Interfaces/UserCustomInfo";
import AssignedQuestionActions from "./AssignedQuestionActions/AssignedQuestionActions";


export default function DisplayAssignedQuestions(): JSX.Element {
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);
  const [authors, setAuthors] = useState<UserCustomInfo[]>([]);

  useEffect(() => {
    const unsubscribeQuestions = onSnapshot(collection(db, "Questions"), (snapshot) => { //onSnapshot(kolekcija, result, error) avtomatsko poda podatke vsakic ko se v bazi spremenijo
      const questionsData: QuestionWithId[] = snapshot.docs.map((doc): QuestionWithId => {
        return {
          id: doc.id,
          customerEmail: doc.data().customerEmail,
          description: doc.data().description,
          lawField: doc.data().lawField,
          created: doc.data().created,
          closed: doc.data().closed
        }
      });
      setQuestions(questionsData);
    }, (error) => {
      console.error(error)
    });

    return () => {unsubscribeQuestions()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
  }, []);

  useEffect(() => {
    const unsubscribeAuthors = onSnapshot(collection(db, "Users"), (snapshot) => {
      const usersData: UserCustomInfo[] = snapshot.docs.map((doc): UserCustomInfo => {
        return {
          fullName: doc.data().fullName,
          academicTitle: doc.data().academicTitle,
          email: doc.data().email,
          group: doc.data().group, 
          lawFields: doc.data().lawFields,
          uid: doc.data().uid
        }
      });
      const justAuthors = usersData.filter((user) => (user.group === Group.Author));
      setAuthors(justAuthors);
    }, (error) => {
      console.error(error)
    });

    return () => {unsubscribeAuthors()}; //To nujno more bit drugace bodo klici v neskoncnost pri onSnapshot()!
  }, []);
  
  const header: JSX.Element = (
    <></>
  );

  const assignedQuestionActions = (question: QuestionWithId): JSX.Element => (
    <AssignedQuestionActions question={question} authors={authors} />
  );

  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Dodeljena vprašanja</h2>
      <div className="row">
      {questions.map(question => (
          <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
              <Card title={question.lawField} subTitle={question.customerEmail} header={header} footer={()=>(assignedQuestionActions(question))} className="md:w-25rem">
                <p className="m-0">
                  Ustvarjeno:<br />
                  {toSlovenianDate(question.created.toDate())} ob {toSlovenianTime(question.created.toDate())}
                </p>
                <hr style={{width: '70%', marginLeft: 'auto', marginRight: 'auto'}} />
                <p>
                  Dodeljeno: <strong>{/* authors.find((author) => (author.uid === question.selectedRespondentUid))?.fullName */}</strong>
                </p>
              </Card>
          </div>
      ))}
      </div>
    </div>
  );
}