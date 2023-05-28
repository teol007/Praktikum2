import React from "react";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import TotalStatistics from "./TotalStatistics/TotalStatistics";
import PersonalStatistics from "./PersonalStatistics/PersonalStatistics";

export default function StatisticsPage(): JSX.Element {
  const navigate = useNavigate();

  const pages: MenuItem[] = [
    {
      label: 'Osebna\u00A0statistika',
      icon: 'pi pi-fw pi-exclamation-circle',
      command: () => {navigate('/statistika/osebnaStatistika')}
    },
    {
      label: 'Skupna\u00A0statistika',
      icon: 'pi pi-fw pi-info-circle',
      command: () => {navigate('/statistika/skupnaStatistika')}
    },
  ];
  
  return (
    <>
      <Menubar model={pages} />
      <Routes>
        <Route path='/skupnaStatistika'
          element={<TotalStatistics />} 
        />
        <Route path='/osebnastatistika'
          element={<PersonalStatistics />}
        />
        <Route path='/*'
          element={<PageNotFound />}/>
      </Routes>
    </>
  );
}