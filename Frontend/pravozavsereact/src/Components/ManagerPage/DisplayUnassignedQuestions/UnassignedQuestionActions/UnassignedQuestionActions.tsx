import React from "react";
import { QuestionWithId } from "../../../../Modules/Interfaces/Question";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";


interface QuestionActionsProps {
  question: QuestionWithId;
  authors: UserCustomInfo[];
}

//const [showContentLawField, setShowContentLawField] = useState<{ [key: string]: boolean }>({});

/* const handleClickLawField = (cardId: string) => {
    setShowContentLawField(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId]
    }));
  }; */

  /* <Button label="Uredi področje" icon="pi pi-pencil" className="p-button-outlined p-button-primary" onClick={() => handleClickLawField(props.question.id)} size="small" />
        {showContentLawField[props.question.id] &&
          <div className="card flex justify-content-center"> <br />
            <label>Spremeni pravno področje</label>
            <Dropdown value={lawField} onChange={(e) => setLawField(e.value)} options={lawFieldsArray}  placeholder="Izberi pravno področje problema"  className="w-full md:w-14rem" />
          </div>}
  */

export default function UnassignedQuestionActions(props: QuestionActionsProps): JSX.Element {
  /*const [selectedAuthor, setSelectedAuthor] = useState<UserCustomInfo|undefined>(props.authors.find((author) => (author.uid === props.question.selectedRespondentUid)));
  const overlayPanelRef = useRef<OverlayPanel>(null);

  const updateQuestionAuthor = async (author: UserCustomInfo) => {
    if(author.uid === props.question.selectedRespondentUid)
      return;

    const questionRef = doc(db, "Questions", props.question.id);
    try {
      await updateDoc(questionRef, {
        selectedRespondentUid: author.uid
      });
      overlayPanelRef.current?.hide();
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectAuthor = (e: DropdownChangeEvent):void => {
    setSelectedAuthor(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if(selectedAuthor)
      updateQuestionAuthor(selectedAuthor);
  }
  
  return (
    <>
      <div className="flex flex-wrap justify-content-end gap-2">
        <div style={{marginLeft: '3em', marginRight: '3em'}}>
          <QuestionDetails question={props.question} />
          <Button label="Dodeli avtorja odgovora" icon="pi pi-user-plus" onClick={(e) => overlayPanelRef.current?.toggle(e)} size="small" style={{width: '100%', margin: '1px'}} />
        </div>

        <OverlayPanel ref={overlayPanelRef} showCloseIcon >
          <form onSubmit={handleSubmit}>
            <span style={{marginBottom: '0.5em'}}>Določi avtorja odgovora</span><br />
            <Dropdown value={selectedAuthor} onChange={handleSelectAuthor} options={props.authors} optionLabel="fullName" placeholder="Določi avtorja odgovora"  className="w-full md:w-14rem" style={{width: 'min-content'}} filter required />
            <Button type="submit" label="Potrdi" icon="pi pi-check" />
          </form>
        </OverlayPanel>
      </div>
    </>
  );
  */
 return <></> //!
}