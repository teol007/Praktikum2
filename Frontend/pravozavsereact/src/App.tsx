import React from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";     
import Greetings from './Components/Greetings/Greetings';
import TestUseOfAtoms from './Components/TestUseOfAtoms/TestUseOfAtom';

function App() {
  return (
    <div className="App">
      <Greetings />
      <TestUseOfAtoms />
    </div>
  );
}

export default App;
