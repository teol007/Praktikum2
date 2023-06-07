import React from "react";
import DisplayUnassignedQuestions from "./DisplayUnassignedQuestions/DisplayUnassignedQuestions";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import DisplayAnswers from "./DisplayAnswers/DisplayAnswers";
import TotalStatistics from "../Statistics/TotalStatistics/TotalStatistics";
import ManageAuthors from "./ManageAuthors/ManageAuthors";
import AutomationSettings from "./AutomationSettings/AutomationSettings";

export default function ManagerPage(): JSX.Element {
  const navigate = useNavigate();

  const pages: MenuItem[] = [
    {
      label: 'Nedodeljena\u00A0vprašanja',
      icon: 'pi pi-fw pi-exclamation-circle',
      command: () => {navigate('/urednik')}
    },
    {
      label: 'Dodeljena\u00A0vprašanja',
      icon: 'pi pi-fw pi-info-circle',
      command: () => {navigate('/urednik/dodeljenaVprasanja')}
    },
    {
      label: 'Skupna\u00A0statistika',
      icon: 'pi pi-fw pi-chart-line',
      command: () => {navigate('/urednik/skupnaStatistika')}
    },
    {
      label: 'Nastavitve',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: 'Upravljanje avtorjev',
          icon: 'pi pi-fw pi-user-edit',
          command: () => {navigate('/urednik/upravljanjeAvtorjev')}
        },
        {
          label: 'Nastavitve avtomatizacije',
          icon: 'pi pi-fw pi-sitemap',
          command: () => {navigate('/urednik/nastavitveAvtomatizacije')}
        },
      ]
    },
  ];
  
  return (
    <>
      <Menubar model={pages} />
      <Routes>
        <Route path='/'
          element={<DisplayUnassignedQuestions />} 
        />
        <Route path='/dodeljenaVprasanja'
          element={<DisplayAnswers />}
        />
        <Route path='/skupnaStatistika'
          element={<TotalStatistics />}
        />
        <Route path='/upravljanjeAvtorjev'
          element={<ManageAuthors />}
        />
        <Route path='/nastavitveAvtomatizacije'
          element={<AutomationSettings />}
        />
        <Route path='/*'
          element={<PageNotFound />}/>
      </Routes>
    </>
  );
}