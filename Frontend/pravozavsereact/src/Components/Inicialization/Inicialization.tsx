import React from "react";
import QuestionsInicialization from "./QuestionsInicialization/QuestionsInicialization";
import UsersInicialization from "./UsersInicialization/UsersInicialization";
import AnswersInicialization from "./AnswersInicialization/AnswersInicialization";
import UserLoggedInInicialization from "./UserLoggedInInicialization/UserLoggedInInicialization";
import OrganizationsInicialization from "./OrganizationsInicialization/OrganizationsInicialization";

export default function Inicialization(): JSX.Element {
  return (
		<>
      <UserLoggedInInicialization />
      <QuestionsInicialization />
      <AnswersInicialization />
      <UsersInicialization />
      <OrganizationsInicialization />
    </>
  );
}
