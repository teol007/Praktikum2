import React from "react";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { getAnswerResonsesDeadlineDate, timeBetweenDates, timeBetweenDatesSeconds } from "../../../Modules/Functions/DateConverters";

interface AnswerProps {
    answer: AnswerWithId;
}

export default function TimeUntilResponsesDeadline(props: AnswerProps): JSX.Element {
  if(!props.answer.authorAssigned)
    return (<i>Datum začetka ni bil določen.</i>);

  const dateOfExpiration = getAnswerResonsesDeadlineDate(props.answer.authorAssigned.toDate());
  const differenceSeconds = timeBetweenDatesSeconds(new Date(), dateOfExpiration);

  if(differenceSeconds <= 0)
    return (
      <div style={{color: 'blue'}}>Rok za odzive je potekel:<br />{timeBetweenDates(new Date(), dateOfExpiration)}</div>
    );

  return (
    <div>
      Rok za odzive:<br />
      {timeBetweenDates(new Date(), dateOfExpiration)}
    </div>
  );
}