import React, { useState } from "react";
import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../Atoms/AnswersDBAtom";
import { questionsDBAtom } from "../../Atoms/QuestionsDBAtom";
import { usersDBAtom } from "../../Atoms/UsersDBAtom";
import { AnswerWithId } from "../../Modules/Interfaces/Answer";
import { QuestionWithId } from "../../Modules/Interfaces/Question";
import ResponsesStatusesCount from "../Answer/Response/ResponsesStatusesCount/ResponseStatuses";
import AnswerDetails from "../Answer/AnswerDetails/AnswerDetails";
import { Dropdown } from "primereact/dropdown";

export default function Archive(): JSX.Element {
  const [answers] = useAtom(answersDBAtom);
  const [questions] = useAtom(questionsDBAtom);
  const [users] = useAtom(usersDBAtom);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedLawField, setSelectedLawField] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user) => user.uid === answer.authorUid)?.academicTitle + ' ';
    text += users.find((user) => user.uid === answer.authorUid)?.fullName;
    return <>{text}</>;
  };

  const handleAuthorChange = (event: { value: string }) => {
    setSelectedAuthor(event.value);
  };

  const handleLawFieldChange = (event: { value: string }) => {
    setSelectedLawField(event.value);
  };

  const handleMonthChange = (event: { value: string }) => {
    setSelectedMonth(Number(event.value));
  };


  const filteredAnswers = answers.filter((answer) => {
    if (selectedAuthor && answer.authorUid !== selectedAuthor) {
      return false;
    }
    if (selectedLawField) {
      const question: QuestionWithId | undefined = questions.find((q) => q.id === answer.questionId);
      if (!question || !question.lawFields.includes(selectedLawField)) {
        return false;
      }
    }
    if (selectedMonth !== null) {
      const answeredDate = answer.answered ? answer.answered.toDate() : null;
      if (!answeredDate || answeredDate.getMonth() !== selectedMonth) {
        return false;
      }
    }
    return true;
  });

  const lawFieldsArray = [ 'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
  'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'];

  const months = ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'];

  
  return (
    <div>
      <h2 style={{ margin:'30px'}}>Arhiv vprašanj in odgovorov</h2>

      <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight:'15px'}}>
          <label htmlFor="authorSelect">Avtor:</label>
          <Dropdown id="authorSelect" value={selectedAuthor || ''} options={users.map(user => ({ label: `${user.academicTitle} ${user.fullName}`, value: user.uid }))} onChange={handleAuthorChange} placeholder="Vsi avtorji" />
        </div>
        <div style={ {marginRight:'15px'}}>
          <label htmlFor="lawFieldSelect">Pravno področje:</label>
          <Dropdown id="lawFieldSelect" value={selectedLawField || ''} options={lawFieldsArray.map(field => ({ label: field, value: field }))} onChange={handleLawFieldChange} placeholder="Vsa področja" />
        </div>
        <div>
          <label htmlFor="monthSelect">Mesec:</label>
          <Dropdown id="monthSelect" value={selectedMonth !== null ? selectedMonth?.toString() : ''} options={months.map((month, index) => ({ label: month, value: index.toString() }))} onChange={handleMonthChange} placeholder="Vsi meseci" />
        </div>
      </div>

      <div className="row">
        {filteredAnswers.map((answer) => (
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <Card title={<></>} subTitle={() => answerAuthor(answer)} footer={<AnswerDetails answer={answer} />} className="md:w-25rem">
              <hr />
              <ResponsesStatusesCount responses={answer.responses} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}