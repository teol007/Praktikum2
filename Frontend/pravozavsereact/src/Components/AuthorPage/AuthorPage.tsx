import React, { useEffect } from "react";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import { QuestionsToAnswer } from "./DisplayQuestionsToAnswer/DisplayQuestionsToAnswer";
import DisplayAnswersToEvaluate from "./DisplayAnswersToEvaluate/DisplayAnswersToEvaluate";
import AddAnwser from "../Answer/AddAnwser/AddAnwser";
import { firebaseAuth } from "../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AuthorPage(): JSX.Element {
  const [user] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user){
      navigate("/racun");
    }
  }, [user, navigate]);

  const pages: MenuItem[] = [
    {
      label: 'Vprašanja\u00A0za\u00A0odgovoriti',
      icon: 'pi pi-fw pi-exclamation-circle',
      command: () => {navigate('/avtor')}
    },
    {
      label: 'Odgovori\u00A0za\u00A0oceniti',
      icon: 'pi pi-fw pi-info-circle',
      command: () => {navigate('/avtor/ocenaOdgovorov')}
    },
  ];
  
  return (
    <>
      <Menubar model={pages} />
      <Routes>
        <Route path='/'
          element={<QuestionsToAnswer />} 
        />
        <Route path='/ocenaOdgovorov'
          element={<DisplayAnswersToEvaluate />}
        />
        <Route path='/odgovor/:questionId'
              element={<AddAnwser />}
        />
        <Route path='/*'
          element={<PageNotFound />}/>
      </Routes>
    </>
  );
}