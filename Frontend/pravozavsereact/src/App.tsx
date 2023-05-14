import React from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";     
import 'primeicons/primeicons.css';
import { Routes, Route } from 'react-router';
import Greetings from './Components/Greetings/Greetings';
import TestUseOfAtoms from './Components/Test/TestUseOfAtoms/TestUseOfAtom';
import AddQuestion from './Components/AddQuestion/AddQuestion';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Tests from './Components/Test/Tests/Tests';
import HumanRights from './Components/HumanRights/HumanRights';
import AboutUs from './Components/AboutUs/AboutUs';

function App() {
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
          <Route path='/aboutUs'
              element={<AboutUs/>}/>
          <Route path='/humanRights'
              element={<HumanRights/>}/>
          <Route path='/tests'
              element={<Tests />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
