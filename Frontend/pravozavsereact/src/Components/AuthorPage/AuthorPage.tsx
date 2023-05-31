import React from "react";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import DisplayAnswersToEvaluate from "./DisplayAnswersToEvaluate/DisplayAnswersToEvaluate";
import { PendingAnswers } from "./PendingAnswers/PendingAnswers";
import OldComments from "./OldComments/OldComments";
import PersonalStatistics from "../Statistics/PersonalStatistics/PersonalStatistics";

export default function AuthorPage(): JSX.Element {
  const navigate = useNavigate();

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
    {
      label: 'Moji\u00A0komentarji',
      icon: 'pi pi-fw pi-info-circle',
      command: () => {navigate('/avtor/mojiKomentarji')}
    },
    {
      label: 'Moja\u00A0statistika',
      icon: 'pi pi-fw pi-chart-line',
      command: () => {navigate('/avtor/mojaStatistika')}
    },
  ];
  
  return (
    <>
      <Menubar model={pages} />
      <Routes>
        <Route path='/'
          element={<PendingAnswers />} 
        />
        <Route path='/ocenaOdgovorov'
          element={<DisplayAnswersToEvaluate />}
        />
         <Route path='/mojiKomentarji'
          element={<OldComments />}
        />
        <Route path='/mojaStatistika'
          element={<PersonalStatistics />}
        />
        <Route path='/*'
          element={<PageNotFound />}/>
      </Routes>
    </>
  );
}