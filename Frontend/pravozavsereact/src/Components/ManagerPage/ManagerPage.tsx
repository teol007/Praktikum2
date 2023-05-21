import React from "react";
import DisplayUnassignedQuestions from "./DisplayUnassignedQuestions/DisplayUnassignedQuestions";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import DisplayAnswers from "./DisplayAnswers/DisplayAnswers";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../Config/Firebase";

export default function ManagerPage(): JSX.Element {
  const [user] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  if (!user){
    navigate("/racun");
  }
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
        <Route path='/*'
          element={<PageNotFound />}/>
      </Routes>
    </>
  );
}