import React, { PropsWithChildren, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { toSlovenianDate, toSlovenianTime } from "../../../Modules/Functions/DateConverters";
import { AnswerWithId, Response } from "../../../Modules/Interfaces/Answer";
import QuestionDetails from "../../Questions/QuestionDetails/QuestionDetails";
import { useAtom } from "jotai";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import DisplayResponse from "../Response/DisplayResponse/DisplayResponse";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ScrollTop } from 'primereact/scrolltop';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import './AnswerDetails.css'
import FileDownloadButton from "../FIles/FileDownloadButton/FileDownloadButton";
import DisplayAnswerTags from "./DisplayAnswerTags/DisplayAnswerTags";

export interface AnswerDetailsProps{
  answer: AnswerWithId;
  withPersonalData?: boolean;
  withQuestionPersonalData?: boolean;
}

const carouselResponsiveOptions: CarouselResponsiveOption[] = [
  {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
  }
];

const displayAnswerAuthorAssigned = (answer: AnswerWithId): JSX.Element => {
  const date = answer.authorAssigned;
  if(!date)
    return <i>Ni znano</i>
  return <>{toSlovenianDate(date.toDate())} ob {toSlovenianTime(date.toDate())}</>
}

const displayResponses = (answer: AnswerWithId): JSX.Element => {
  if(answer.responses.length <= 0)
    return <i style={{display: 'inline-block', paddingLeft: '1em'}}>Ni odzivov</i>
  return (
    <div>
      <Carousel className="m-0 p-0"
        value={answer.responses}
        numVisible={3} 
        numScroll={1} 
        itemTemplate={(item: Response)=>(<DisplayResponse response={item} />) /* key={props.answer.id+'/'+response} */ }
        responsiveOptions={carouselResponsiveOptions}
      />
    </div>
  );
}

/**
 * withPersonalData?: boolean, withQuestionPersonalData?: boolean
 * @param props 
 * @returns button Podrobnosti, that shows answer details
 */
export default function AnswerDetails(props: PropsWithChildren<AnswerDetailsProps>): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [users] = useAtom(usersDBAtom);
  const [visible, setVisible] = useState<boolean>(false);

  const displayQuestionDetails = (answer: AnswerWithId): JSX.Element => {
    const questionOfAnswer = questions.find((question)=>(question.id === answer.questionId));
    if(!questionOfAnswer)
      return <i>Ni znano</i>;
    return <QuestionDetails question={questionOfAnswer} withPersonalData={props.withQuestionPersonalData} />;
  }

  const displayAnswerAuthor = (answer: AnswerWithId): JSX.Element => {
    const author = users.find((user)=>(user.uid === answer.authorUid));
    if(!author)
      return <i>Ni znano</i>;
    return <>{author.academicTitle} {author.fullName}</>;
  }

  return (
    <div className="flex justify-content-center">
      <Button label="Podrobnosti" icon="pi pi-external-link" className="p-button-outlined p-button-primary" size="small" onClick={() => setVisible(true)} style={{width: '100%', margin: '1px'}} />
      <Dialog header="Podrobnosti odgovora na vprašanje" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} >
        <div>
          <div style={{marginTop: '1em', marginBottom: '1em'}}><b>Navezuje se na vprašanje: </b>{displayQuestionDetails(props.answer)}</div>
          {props.withPersonalData && <p><b>Avtor odgovora na vprašanje: </b>{displayAnswerAuthor(props.answer)}</p>}
          {props.withPersonalData && <p><b>Avtor je bil določen: </b>{displayAnswerAuthorAssigned(props.answer)}</p>}
          <p><b>Odgovorjeno (oddano): </b>{props.answer.answered ? `Da, ${toSlovenianDate(props.answer.answered.toDate())} ob ${toSlovenianTime(props.answer.answered.toDate())}` : 'Ne'}</p>
          <p><b>Datoteka: </b>{props.answer.fileUrl!=='' ? <FileDownloadButton answer={props.answer} /> : <i>Datoteka ni oddana</i>}</p>
          <div style={{marginTop: '1em', marginBottom: '1em'}}><b>Oznake (tags): </b><DisplayAnswerTags answer={props.answer} /></div>
          <Accordion style={{padding: 0, marginBottom: '1em'}} className="saveSpace">
            <AccordionTab header={`Odzivi (${props.answer.responses.length})`} style={{padding: 0}}>
              {displayResponses(props.answer)}
            </AccordionTab>
          </Accordion>
          <p><b>Objavljeno: </b>{props.answer.published ? `Da, ${toSlovenianDate(props.answer.published.toDate())} ob ${toSlovenianTime(props.answer.published.toDate())}` : 'Ne'}</p>
          {props.children && <div>Dodatne možnosti:<br />{props.children}</div>}
        </div>
        <ScrollTop target="parent" />
      </Dialog>
    </div>
  )
}