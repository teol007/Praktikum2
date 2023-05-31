import React from "react";

interface LawFieldsProps {
    lawFields: string[];
}

export default function DisplayLawFieldsText(props: LawFieldsProps): JSX.Element {
  return (
    <div>
      {props.lawFields.map((lawField, index) => (
        <span key={lawField}>{lawField}{index===props.lawFields.length-1 ? '' : ', '}</span>
      ))}
    </div>
  );
}

