import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useAtom } from "jotai";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ScrollTop } from 'primereact/scrolltop';
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import QuestionDetails from "../../../Questions/QuestionDetails/QuestionDetails";
import { questionsDBAtom } from "../../../../Atoms/QuestionsDBAtom";

export interface AnswerDetailsProps{
  answer: AnswerWithId;
}

export default function AnswerDetails(props: AnswerDetailsProps): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [visible, setVisible] = useState<boolean>(false);

  const displayQuestionDetails = (answer: AnswerWithId): JSX.Element => {
    const questionOfAnswer = questions.find((question)=>(question.id === answer.questionId));
    if(!questionOfAnswer)
      return <i>Ni znano</i>;
    return <QuestionDetails question={questionOfAnswer} />;
  }

  return (
    <div className="flex justify-content-center">
      <Button label="Podrobnosti" icon="pi pi-external-link" className="p-button p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
      <Dialog header="Podrobnosti odgovora na vprašanje" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} blockScroll={true}>
        <div>
          <div style={{marginTop: '1em', marginBottom: '1em'}}>
            <b>Navezuje se na vprašanje: </b>{displayQuestionDetails(props.answer)}</div>
            <p><b>Naslov: </b>{props.answer.title!=='' ? props.answer.title : <i>Ni naslova</i>}</p>
            <Accordion>
              <AccordionTab header="Vsebina" >
                <p className="m-0">{props.answer.content!=='' ? props.answer.content : <i>Ni vsebine</i>}</p>
              </AccordionTab>
            </Accordion>
          </div>
          <ScrollTop target="parent" />
      </Dialog>
    </div>
  )
}