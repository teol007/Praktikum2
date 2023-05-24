import React, { useState } from "react";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Config/Firebase";
import DisplayAnswerTags from "../../AnswerDetails/DisplayAnswerTags/DisplayAnswerTags";

interface AnswerProps {
    answer: AnswerWithId;
}

export default function SetTags(props: AnswerProps): JSX.Element {
  const [editTags, setEditTags] = useState<boolean>(false);
  const [allTags, setAllTags] = useState<string[]>(props.answer.tags);
  const [selectedTags, setSelectedTags] = useState<string[]>(props.answer.tags);
  const [newTag, setNewTag] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  }

  const handleAddTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(newTag === '')
      return;
    
    if(allTags.includes(newTag))
    {
      if(!selectedTags.includes(newTag))
        setSelectedTags([...selectedTags, newTag]);;
      return;
    }

    setAllTags([...allTags, newTag]);
    setSelectedTags([...selectedTags, newTag]);
    setNewTag('');
  }

  const handleSubmitTags = () => {
    if(JSON.stringify(selectedTags) === JSON.stringify(props.answer.tags))
    {
      setEditTags(false);
      return;
    }

    const updateAnswer = async () => { 
      const answerRef = doc(db, "Answers", props.answer.id);
      try {
        await updateDoc(answerRef, {
          tags: selectedTags
        });
      } catch (error) {
        console.error(error);
      }
    }
    updateAnswer();
    setEditTags(false);
  }

  return (
    <div style={{textAlign: 'center', marginTop: '1em'}}>
      {!editTags && 
        <>
          <strong>Oznake (tags): </strong><DisplayAnswerTags answer={props.answer} /><br />
          <Button label="Uredi oznake" onClick={()=>setEditTags(true)} icon="pi pi-edit" severity="secondary" size="small" style={{marginTop: '0.5em'}} />
        </>}

      {editTags && 
        <div style={{textAlign: 'center'}}>
          Izbrane oznake (tags):
          <MultiSelect value={selectedTags} onChange={(e: MultiSelectChangeEvent) => setSelectedTags(e.value)} options={allTags} display="chip"
                    placeholder="Ni izbranih oznak" className="w-full md:w-20rem" style={{width: '100%', marginBottom: '0.5em'}} filter />
          Dodaj oznako: <InputText value={newTag} onChange={handleChange} />
          <Button label="Dodaj oznako" onClick={handleAddTag} icon="pi pi-plus" severity="secondary" />
          <Button label="Potrdi izbrane oznake" onClick={handleSubmitTags} icon="pi pi-check" />
        </div>
      }
    </div>
  );
}

