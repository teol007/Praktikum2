import React from "react";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import { QuestionsToAnswer } from "./QuestionsToAnswer/QuestionsToAnswer";
import { QuestionsToEvaluate } from "./QuestionsToEvaluate/QuestionsToEvaluate";

export default function ManagerPage(): JSX.Element {
  const navigate = useNavigate();
  const pages: MenuItem[] = [
    {
      label: 'vprašanja\u00A0za\u00A0odgovoriti',
      icon: 'pi pi-fw pi-exclamation-circle',
      command: () => {navigate('/avtor')}
    },
    {
      label: 'odgovori\u00A0za\u00A0oceniti',
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
          element={<QuestionsToEvaluate />}
        />
        <Route path='/*'
          element={<PageNotFound />}/>
      </Routes>
    </>
  );
}