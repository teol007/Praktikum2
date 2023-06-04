import React from "react";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { getAnswerDeadlineDate, timeBetweenDates, timeBetweenDatesSeconds, toSlovenianDateTime } from "../../../Modules/Functions/DateConverters";

interface AnswerProps {
    answer: AnswerWithId;
}

export default function TimeUntilAnswered(props: AnswerProps): JSX.Element {
  if(props.answer.answered)
    return (<div style={{color: 'green'}}>ODDANO<br />{toSlovenianDateTime(props.answer.answered.toDate())}</div>);

  if(!props.answer.authorAssigned)
    return (<i>Datum začetka ni bil določen.</i>);

  const dateOfExpiration = getAnswerDeadlineDate(props.answer.authorAssigned.toDate());
  const differenceSeconds = timeBetweenDatesSeconds(new Date(), dateOfExpiration);

  if(differenceSeconds <= 0)
    return (
      <div style={{color: 'red'}}>Rok za oddajo je potekel:<br />{timeBetweenDates(new Date(), dateOfExpiration)}</div>
    );

  return (
    <div>
      Rok za oddajo:<br />
      {timeBetweenDates(new Date(), dateOfExpiration)}
    </div>
  );
}