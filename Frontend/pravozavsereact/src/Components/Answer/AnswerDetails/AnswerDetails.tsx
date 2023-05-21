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
import { Chip } from 'primereact/chip';
import { ScrollTop } from 'primereact/scrolltop';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import './AnswerDetails.css'

export interface AnswerDetailsProps{
  answer: AnswerWithId;
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

const displayTags = (answer: AnswerWithId): JSX.Element => {
  if(answer.tags.length <= 0)
    return <i>Ni oznak</i>
  return (
    <>
      {answer.tags.map((tag, index): JSX.Element => (
        <span key={tag}><Chip label={tag} style={{display: 'inline-block'}} /> </span>
      ))}
    </>
  );
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


export default function AnswerDetails(props: PropsWithChildren<AnswerDetailsProps>): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [users] = useAtom(usersDBAtom);
  const [visible, setVisible] = useState<boolean>(false);

  const displayQuestionDetails = (answer: AnswerWithId): JSX.Element => {
    const questionOfAnswer = questions.find((question)=>(question.id === answer.questionId));
    if(!questionOfAnswer)
      return <i>Ni znano</i>;
    return <QuestionDetails question={questionOfAnswer} />;
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
      <Dialog header="Podrobnosti odgovora na vprašanje" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)} blockScroll={true}>
        <div>
          <div style={{marginTop: '1em', marginBottom: '1em'}}><b>Navezuje se na vprašanje: </b>{displayQuestionDetails(props.answer)}</div>
          <p><b>Avtor odgovora na vprašanje: </b>{displayAnswerAuthor(props.answer)}</p>
          <p><b>Avtor je bil določen: </b>{displayAnswerAuthorAssigned(props.answer)}</p>
          <p><b>Naslov: </b>{props.answer.title!=='' ? props.answer.title : <i>Ni naslova</i>}</p>
          <Accordion>
            <AccordionTab header="Vsebina" >
              <p className="m-0">{props.answer.content!=='' ? props.answer.content : <i>Ni vsebine</i>}</p>
            </AccordionTab>
          </Accordion>
          <div style={{marginTop: '1em', marginBottom: '1em'}}><b>Oznake (tags): </b>{displayTags(props.answer)}</div>
          <p><b>Odgovorjeno (oddano): </b>{props.answer.answered ? `Da, ${toSlovenianDate(props.answer.answered.toDate())} ob ${toSlovenianTime(props.answer.answered.toDate())}` : 'Ne'}</p>
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