import React from "react";
import { useAtom } from "jotai";
import { test1Atom, test2Atom } from "../../Atoms/TestsAtoms";

export default function TestUseOfAtoms(): JSX.Element {
  const [test1, setTest1] = useAtom(test1Atom); //To je cisto isto kot useState(), samo da useAtom() vzame in ureja stanje, ki je narejeno nekje drugje
  const [test2, setTest2] = useAtom(test2Atom);

  return (
    <>
      <p>Testni atom 'test1' ima vrednost: {test1}</p>
      <button onClick={ ():void => setTest1(test1+1) }>Povečaj številko 'test1'</button>

      <br />
      <p>Testni atom 'test2' je objekt: {test2.name} {test2.years}</p>
      <button onClick={ ():void => setTest2({name: 'Janez', years:38}) }>Spremeni ime na Janez</button>
      <button onClick={ ():void => setTest2({...test2, years: 5}) }>Zmanšaj leta na 5</button>
      <button onClick={ ():void => setTest2((before) => { return {...before, name: 'Aleks'} }) }>Spremeni ime na Aleks</button>
    </>
    //Zadnji gumb je najboljsi nacin za spreminjanje stanja    parameter before je stanje tik pred spremembo
  );
}

