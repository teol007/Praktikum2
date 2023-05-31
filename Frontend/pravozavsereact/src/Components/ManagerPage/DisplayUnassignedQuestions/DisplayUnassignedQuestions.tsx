import React from "react";
import { Card } from 'primereact/card';
import { toSlovenianDate, toSlovenianTime } from "../../../Modules/Functions/DateConverters";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import UnassignedQuestionActions from "./UnassignedQuestionActions/UnassignedQuestionActions";
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { doc, updateDoc } from "firebase/firestore";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { db } from "../../../Config/Firebase";
import { organizationsDBAtom } from "../../../Atoms/OrganizationsDBAtom";
import { settingsOrganizationDocId } from "../../../Config/OrganizationDocuments";
import DisplayLawFieldsText from "../../Questions/DisplayLawFields/DisplayLawFieldsText/DisplayLawFieldsText";


export default function DisplayUnassignedQuestions(): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [answers] = useAtom(answersDBAtom);
  const [mainOrganizationDocument] = useAtom(organizationsDBAtom);
  const isAutoAssignOn = mainOrganizationDocument?.autoAssignQuestions;

  const unassignedQuestionActions = (question: QuestionWithId): JSX.Element => (
    <UnassignedQuestionActions question={question} />
  );

  const filterUnassignedQuestions = (questions: QuestionWithId[]): QuestionWithId[] => {
    const assignedQuestionsIDs = answers.map((answer)=>(answer.questionId));
    return questions.filter((question)=>(!assignedQuestionsIDs.includes(question.id)));
  }

  const confirmChangeAutoAssignQuestions = (message: JSX.Element, value: boolean) => {
    confirmDialog({
        header: 'Potrditev',
        message: message,
        icon: 'pi pi-exclamation-triangle',
        async accept() {
          try {
            await updateDoc(doc(db, "Organizations/"+settingsOrganizationDocId), {autoAssignQuestions: value});
          } catch (error) {
            console.warn(error);
          }
        },
    });
  };

  const handleOnChange = (e: ToggleButtonChangeEvent) => {
    if(e.value)
      confirmChangeAutoAssignQuestions(<>Ali res želiš <strong>vklopiti</strong> avtomatsko dodeljevanje novih vprašanj avtorjem?</>, e.value);
    else
      confirmChangeAutoAssignQuestions(<>Ali res želiš <strong>izklopiti</strong> avtomatsko dodeljevanje novih vprašanj avtorjem?</>, e.value);
  }

  return (
    <div className="container">
      <h2 style={{marginTop: '1em'}}>Nedodeljena vprašanja</h2>
      <ConfirmDialog />
      <ToggleButton onLabel="Avtomatsko dodeljevanje novih vprašanj" offLabel="Samo ročno dodeljevanje novih vprašanj" onIcon="pi pi-eject" offIcon="pi pi-inbox" checked={isAutoAssignOn} onChange={handleOnChange} className="w-9rem" />
      <div className="row">
      {filterUnassignedQuestions(questions).map(question => (
          <div key={question.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
              <Card title={<DisplayLawFieldsText lawFields={question.lawFields} />} subTitle={question.customerEmail} footer={()=>(unassignedQuestionActions(question))} className="md:w-25rem">
                <p className="m-0">
                  Ustvarjeno:<br />
                  {toSlovenianDate(question.created.toDate())} ob {toSlovenianTime(question.created.toDate())}
                </p>
              </Card>
          </div>
      ))}
      </div>
    </div>
  );
}