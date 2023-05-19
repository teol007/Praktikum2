import React, { useState } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";     
import 'primeicons/primeicons.css';
import { Routes, Route } from 'react-router';
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
import AddAnwser from './Components/Answer/AddAnwser/AddAnwser';

function App() {

  const [selectedQuesiton, setSelectedQuestion] = useState("");

  const handleQuestionSelection = (selectedQuesitonId: string) => {
    setSelectedQuestion(selectedQuesitonId);
  }

  return (
    <div className="App">
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
          <Route path='/urednik'
              element={<ManagerPage />}/>
          <Route path='/*'
              element={<PageNotFound />}/>
          <Route path='/odgovor/:questionId'
              element={<AddAnwser />}/>
          
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
