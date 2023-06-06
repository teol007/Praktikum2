import React from "react";
import AutoEmailSettings from "./AutoEmailSettings/AutoEmailSettings";
import AutoAssignQuestionsButton from "./AutoAssignQuestionsButton/AutoAssignQuestionsButton";
import { ConfirmDialog } from "primereact/confirmdialog";
import QuestionReceivedEmailsButton from "./QuestionReceivedEmailsButton/QuestionReceivedEmailsButton";

export default function AutomationSettings(): JSX.Element {
  return (
    <>
      <h2 style={{ marginTop: '1em' }}>Nastavitve avtomatizacije</h2>
      <ConfirmDialog /> {/* This has to be here, otherwise other subcomponents won't work */}
      <AutoAssignQuestionsButton />
      <AutoEmailSettings />
      <QuestionReceivedEmailsButton />
    </>
  );
}
