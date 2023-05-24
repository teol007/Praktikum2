import React from "react";
import { Chip } from "primereact/chip";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";

interface AnswerProps {
    answer: AnswerWithId;
}

export default function DisplayAnswerTags(props: AnswerProps): JSX.Element {
  if(props.answer.tags.length <= 0)
    return <i>Ni oznak</i>
    
  return (
    <>
      {props.answer.tags.map((tag): JSX.Element => (
        <span key={tag}><Chip label={tag} style={{display: 'inline-block'}} /> </span>
      ))}
    </>
  );
}
