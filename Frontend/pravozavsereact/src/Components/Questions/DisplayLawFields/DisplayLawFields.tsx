import { Chip } from "primereact/chip";
import React from "react";

interface LawFieldsProps {
    lawFields: string[];
}

export default function DisplayLawFields(props: LawFieldsProps): JSX.Element {
  return (
    <>
      {props.lawFields.map((lawField) => (
        <Chip key={lawField} label={lawField} style={{display: 'inline-block', marginRight: '0.2em'}} />
      ))}
    </>
  );
}

