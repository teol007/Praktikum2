import React from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";     
import Greetings from './Components/Greetings/Greetings';
import TestUseOfAtoms from './Components/TestUseOfAtoms/TestUseOfAtom';
import AddQuestion from './Components/AddQuestion/AddQuestion';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Greetings />
      <TestUseOfAtoms />
      <AddQuestion />
      <Footer />
    </div>
  );
}

export default App;
