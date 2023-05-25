import React from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";     
import 'primeicons/primeicons.css';
import { Routes, Route, Navigate } from 'react-router';
import Greetings from './Components/Greetings/Greetings';
import AddQuestion from './Components/Questions/AddQuestion/AddQuestion';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Tests from './Components/Test/Tests/Tests';
import HumanRights from './Components/HumanRights/HumanRights';
import AboutUs from './Components/AboutUs/AboutUs';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Account from './Components/Account/Account';
import DisplayQuestions from './Components/Questions/DisplayQuestions/DisplayQuestions';
import ManagerPage from './Components/ManagerPage/ManagerPage';
import AuthorPage from './Components/AuthorPage/AuthorPage';
import Inicialization from './Components/Inicialization/Inicialization';
import { useAtom } from 'jotai';
import { userAuthentication } from './Atoms/UserAuthentication';
import { Group } from './Modules/Interfaces/UserCustomInfo';

function App() {
  const [loggedInUser] = useAtom(userAuthentication);

  return (
    <div className="App">
      <Inicialization />
      <Navbar />
      <Routes>
          <Route path='/'
              element={
                <>
                  <Greetings />
                </>
              } />
          <Route path='/zastaviVprasanje'
              element={<AddQuestion/>}/>
          <Route path='/oNas'
              element={<AboutUs/>}/>
          <Route path='/clovekovePravice'
              element={<HumanRights/>}/>
          <Route path='/racun'
              element={<Account />}/>
          <Route path='/vprasanja'
              element={<DisplayQuestions />}/>
          <Route path='/tests'
              element={<Tests />}/>
          <Route path='/urednik/*'
            element={loggedInUser&&loggedInUser.group===Group.Manager ? <ManagerPage /> : <Navigate to={'/racun'} />}
          />
          <Route path='/avtor/*'
              element={loggedInUser&&(loggedInUser.group===Group.Manager||loggedInUser.group===Group.Author) ? <AuthorPage /> : <Navigate to={'/racun'} />}
          />
          <Route path='/*'
              element={<PageNotFound />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
