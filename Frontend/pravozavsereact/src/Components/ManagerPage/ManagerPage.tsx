import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { QuestionWithId } from "../../Modules/Interfaces/Question";
import { toSlovenianDate, toSlovenianTime } from "../../Modules/Functions/DateConverters";
import QuestionActions from "./QuestionActions/QuestionActions";
import { Group, UserCustomInfo } from "../../Modules/Interfaces/UserCustomInfo";

export default function ManagerPage(): JSX.Element {
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);
  const [authors, setAuthors] = useState<UserCustomInfo[]>([]);

  /* 
    const unsubscribe = onSnapshot(collection(db, "Questions"), (querySnapshot) => {
    const questionsData = querySnapshot.docs.map((doc): QuestionWithId => {
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
  });
  */

  useEffect(() => {
    const getQuestions = async () => {
      const questionsCollectionRef = collection(db, 'Questions');
      try {
        const data = await getDocs(questionsCollectionRef);
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

    const getAuthors = async () => {
      const authorsCollectionRef = collection(db, 'Users');
      try {
        const data = await getDocs(authorsCollectionRef);
        const usersData: UserCustomInfo[] = data.docs.map((doc): UserCustomInfo => {
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
        setAuthors([...justAuthors]);
      } catch (error) {
        console.error(error);
      }
    }

    getQuestions();
    getAuthors();
    }, []);

    const header = (
        <></>
    );

    return (
     <div className="container">
        <div className="row">
        {questions.map(question => (
            <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
                <Card title={question.lawField} subTitle={question.customerEmail} header={header} footer={<QuestionActions question={question} authors={authors} />} className="md:w-25rem">
                  <p className="m-0">
                    Ustvarjeno:<br />
                    {toSlovenianDate(question.created.toDate())} ob {toSlovenianTime(question.created.toDate())}
                  </p>
                </Card>
            </div>
        ))}
        </div>
     </div>
    );
}