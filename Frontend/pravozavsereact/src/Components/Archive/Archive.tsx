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
import { MultiSelect } from "primereact/multiselect";

export default function Archive(): JSX.Element {
  const [answers] = useAtom(answersDBAtom);
  const [questions] = useAtom(questionsDBAtom);
  const [users] = useAtom(usersDBAtom);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedLawFields, setSelectedLawFields] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user) => user.uid === answer.authorUid)?.academicTitle + ' ';
    text += users.find((user) => user.uid === answer.authorUid)?.fullName;
    return <>{text}</>;
  };

  const handleAuthorChange = (event: { value: string[] }) => {
    setSelectedAuthors(event.value);
  };

  const handleLawFieldChange = (event: { value: string[] }) => {
    setSelectedLawFields(event.value);
  };

  const handleMonthChange = (event: { value: string[] }) => {
    setSelectedMonths(event.value.map(Number));
  };


  const filteredAnswers = answers.filter((answer) => (answer.published && answer.fileUrl!=='')).filter((answer) => {
    if (selectedAuthors.length > 0 && answer.authorUid && !selectedAuthors.includes(answer.authorUid)) {
      return false;
    }
    if (selectedLawFields.length > 0) {
      const question: QuestionWithId | undefined = questions.find((q) => q.id === answer.questionId);
      if (!question || !selectedLawFields.some(field => question.lawFields.includes(field))) {
        return false;
      }
    }
    if (selectedMonths.length > 0) {
      const answeredDate = answer.answered ? answer.answered.toDate() : null;
      if (!answeredDate || !selectedMonths.includes(answeredDate.getMonth())) {
        return false;
      }
    }
    return true;
  });

  const lawFieldsArray = [
    'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
    'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'
  ];

  const months = ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'];

  const findLawField = (answer: AnswerWithId) => {
    const question: QuestionWithId | undefined = questions.find((q) => q.id === answer.questionId);
    const lawField = question?.lawFields;
    const joinedLawFields = lawField?.join(" & ");
    return joinedLawFields;
  };

  return (
    <div>
      <h2 style={{ margin: '30px' }}>Arhiv zaključenih odgovorov</h2>

      <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '15px' }}>
          <label htmlFor="authorSelect">Avtor:</label>
          <MultiSelect
          filter
            id="authorSelect"
            value={selectedAuthors}
            options={users.map(user => ({ label: `${user.academicTitle} ${user.fullName}`, value: user.uid }))}
            onChange={handleAuthorChange}
            placeholder="Izberite avtorje"
          />
         
        </div>
        <div style={{ marginRight: '15px' }}>
          <label htmlFor="lawFieldSelect">Pravno področje:</label>
          <MultiSelect
            filter
            id="lawFieldSelect"
            value={selectedLawFields}
            options={lawFieldsArray.map(field => ({ label: field, value: field }))}
            onChange={handleLawFieldChange}
            placeholder="Izberite področja"
          />
        </div>
        <div>
          <label htmlFor="monthSelect">Mesec:</label>
          <MultiSelect
            filter
            id="monthSelect"
            value={selectedMonths.map(String)}
            options={months.map((month, index) => ({ label: month, value: index.toString() }))}
            onChange={handleMonthChange}
            placeholder="Izberite mesece"
          />
        </div>
      </div>

<div className="container">
<div className="row">
      {filteredAnswers.map((answer) => (
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <Card title={() => findLawField(answer)} subTitle={() => answerAuthor(answer)} footer={<AnswerDetails answer={answer} />} className="md:w-25rem" style={{minWidth:'300px'}}>
              <hr />
              <ResponsesStatusesCount responses={answer.responses} />
            </Card>
          </div>
      ))} 
      </div>

</div>
      

    </div>

    
  );
}
