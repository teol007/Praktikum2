import React from "react";
import TestUseOfAtoms from "../TestUseOfAtoms/TestUseOfAtom";
import TestUseOfFirestore from "../TestUseOfFirestore/TestUseOfFirestore";


export default function Tests(): JSX.Element {
  return (
    <>
        <TestUseOfAtoms />
        <hr />
        <TestUseOfFirestore />
    </>
  );
}

