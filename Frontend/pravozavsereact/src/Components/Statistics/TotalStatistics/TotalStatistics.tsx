import { useAtom } from 'jotai';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useState } from 'react';
import { usersDBAtom } from '../../../Atoms/UsersDBAtom';
import { lawFieldsArray } from '../../../Modules/Objects/lawFieldsArray';
import { UserCustomInfo } from '../../../Modules/Interfaces/UserCustomInfo';
import CommentsStatistics from '../CommentsStatistics/CommentsStatistics';
import QuestionStatistics from '../QuestionStatistics/QuestionStatistics';

export default function TotalStatistics(): JSX.Element {
    const [users] = useAtom(usersDBAtom);
    const [selectedAuthorsQuestion, setSelectedAuthorsQuestion] = useState<UserCustomInfo[] | null>(null);
    const [selectedAuthors, setSelectedAuthors] = useState<UserCustomInfo[] | null>(null);
    const [selectedLawFields, setSelectedLawFields] = useState<string[] | null>(null);
    const [selectedLawFieldsComments, setSelectedLawFieldsComments] = useState<string[] | null>(null);
  
    return (
        <div>
          <div className="container" style={{marginLeft: 0, marginTop: "10px"}}>
            <div className="row  pull-left" >
                <div className="col">
                <div className="card">
                    <Accordion activeIndex={0}>
                        <AccordionTab header="Statistika pravnih vprašanj">
                            <Accordion activeIndex={1}>
                                <AccordionTab header="Sortiraj po avtorju">
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedAuthorsQuestion} onChange={(e: MultiSelectChangeEvent) => setSelectedAuthorsQuestion(e.value)} options={users} optionLabel="fullName" 
                                        filter placeholder="Izberi avtorja" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                </div>
                                </AccordionTab>
                                <AccordionTab header="Sortiraj po pravnem področju">
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedLawFields} onChange={(e: MultiSelectChangeEvent) => setSelectedLawFields(e.value)} options={lawFieldsArray} 
                                        filter placeholder="Izberi pravno področje" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                </div>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>
                        <AccordionTab header="Statistika komentarjev na pravna vprašanja">
                            <Accordion activeIndex={2}>
                                <AccordionTab header="Sortiraj po avtorju">
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedAuthors} onChange={(e: MultiSelectChangeEvent) => setSelectedAuthors(e.value)} options={users} optionLabel="fullName" 
                                        filter placeholder="Izberi avtorja" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                </div>
                                </AccordionTab>
                                <AccordionTab header="Sortiraj po tipu komentarja">
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedLawFieldsComments} onChange={(e: MultiSelectChangeEvent) => setSelectedLawFieldsComments(e.value)} options={lawFieldsArray} 
                                        filter placeholder="Izberi pravno področje" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                </div>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>    
                    </Accordion>    
                </div> 
                </div>
                <div className="col">
                    <h4>Graf pravnih vprašanj</h4>
                    <QuestionStatistics users={selectedAuthorsQuestion} lawFields={selectedLawFields} /> <br />
                    <h4>Graf komentarjev na pravna vprašanja</h4> <br />
                    <CommentsStatistics users={selectedAuthors} lawFields={selectedLawFieldsComments} /> <br />
                </div>
            </div>
          </div>
        </div>
    );
}