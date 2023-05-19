import React from "react";
import QuestionsInicialization from "./QuestionsInicialization/QuestionsInicialization";
import UsersInicialization from "./UsersInicialization/UsersInicialization";
import AnswersInicialization from "./AnswersInicialization/AnswersInicialization";

export default function Inicialization(): JSX.Element {
  return (
		<>
      <QuestionsInicialization />
      <AnswersInicialization />
      <UsersInicialization />
    </>
  );
}
