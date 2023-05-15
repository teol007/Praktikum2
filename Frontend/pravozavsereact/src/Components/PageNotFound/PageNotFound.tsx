import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function PageNotFound(): JSX.Element {
  return (
    <>
      <br /><br />
      <h1>Ups, te strani ni bilo mogoče najti.</h1>
      <Link to={'/'}><Button>Pojdi domov</Button></Link>
    </>
  );
}

