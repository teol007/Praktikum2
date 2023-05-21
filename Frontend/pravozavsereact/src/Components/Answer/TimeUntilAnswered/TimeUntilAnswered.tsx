import React from "react";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { timeBetweenDates, timeBetweenDatesSeconds, toSlovenianDateTime } from "../../../Modules/Functions/DateConverters";

interface AnswerProps {
    answer: AnswerWithId;
}

export default function TimeUntilAnswered(props: AnswerProps): JSX.Element {
  if(props.answer.answered)
    return (<div style={{color: 'green'}}>ODDANO<br />{toSlovenianDateTime(props.answer.answered.toDate())}</div>);

  const authorAssignedTimestamp = props.answer.authorAssigned;
  if(!authorAssignedTimestamp)
    return (<i>Datum začetka ni bil določen.</i>);

  const dateOfExpiration = authorAssignedTimestamp.toDate();
  dateOfExpiration.setDate(dateOfExpiration.getDate()+7);
  const differenceSeconds = timeBetweenDatesSeconds(new Date(), dateOfExpiration);

  if(differenceSeconds <= 0)
    return (
      <div style={{color: 'red'}}>Rok je potekel:<br />{timeBetweenDates(new Date(), dateOfExpiration)}</div>
    );

  return (
    <div>
      Rok za oddajo:<br />
      {timeBetweenDates(new Date(), dateOfExpiration)}
    </div>
  );
}