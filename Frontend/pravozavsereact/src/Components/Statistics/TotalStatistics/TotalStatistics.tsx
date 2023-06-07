import { useAtom } from 'jotai';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useState } from 'react';
import { usersDBAtom } from '../../../Atoms/UsersDBAtom';
import { lawFieldsArray } from '../../../Modules/Objects/lawFieldsArray';
import { UserCustomInfo } from '../../../Modules/Interfaces/UserCustomInfo';
import CommentsStatistics from '../CommentsStatistics/CommentsStatistics';
import QuestionStatistics from '../QuestionStatistics/QuestionStatistics';
import LateStatistics from '../LateStatistics/LateStatistics';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";

export default function TotalStatistics(): JSX.Element {
    const [users] = useAtom(usersDBAtom);
    const [selectedAuthorsQuestion, setSelectedAuthorsQuestion] = useState<UserCustomInfo[] | null>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<UserCustomInfo[] | null>([]);
    const [selectedLawFields, setSelectedLawFields] = useState<string[] | null>([]);
    const [selectedLawFieldsComments, setSelectedLawFieldsComments] = useState<string[] | null>([]);
    const [selectedAuthorLate, setSelectedAuthorLate] = useState<UserCustomInfo | undefined>(users[1]); //za zdaj je default nastavljeno na Maja Prosenjak, ker noben drug nima zamude - da se kaj vidi
    const [timeFrameQuestions, setTimeFrameQuestions] = useState<Date[] | null>([]);
    const [timeFrameComments, setTimeFrameComments] = useState<Date[] | null>([]);

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
                                        display="chip" filter placeholder="Izberi pravno področje" maxSelectedLabels={2} className="w-full md:w-20rem" />
                                </div>
                                </AccordionTab>
                                <AccordionTab header="Sortiraj po časovnem obdobju">
                                <div className="card flex justify-content-center">
                                    <Calendar value={timeFrameQuestions}  onChange={(e) => setTimeFrameQuestions(e.value as Date[])} selectionMode="range" 
                                    showIcon readOnlyInput showButtonBar />
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
                                <AccordionTab header="Sortiraj po časovnem obdobju">
                                <div className="card flex justify-content-center">
                                    <Calendar value={timeFrameComments}  onChange={(e) => setTimeFrameComments(e.value as Date[])} 
                                    selectionMode="range" showIcon readOnlyInput showButtonBar />
                                </div>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>
                        <AccordionTab header="Statistika zamude">
                            <Accordion activeIndex={3}>
                                <AccordionTab header="Sortiraj po avtorju">
                                <div className="card flex justify-content-center">
                                    <Dropdown value={selectedAuthorLate} onChange={(e: DropdownChangeEvent) => setSelectedAuthorLate(e.value)} 
                                    options={users} optionLabel="fullName" placeholder="Izberi avtorja" className="w-full md:w-14rem" />
                                </div>
                                </AccordionTab>
                            </Accordion>
                        </AccordionTab>
                    </Accordion>
                </div>
                <h4 style={{marginTop: "15px"}}>Graf zamud za avtorja: {selectedAuthorLate?.fullName} </h4>
                    <LateStatistics user={selectedAuthorLate} timeFrame={null} />  
                </div>
                <div className="col">
                    <h4>Graf pravnih vprašanj</h4>
                    <QuestionStatistics users={selectedAuthorsQuestion} lawFields={selectedLawFields} timeFrame={timeFrameQuestions} /> <br />
                    <h4>Graf komentarjev na pravna vprašanja</h4> <br />
                    <CommentsStatistics users={selectedAuthors} lawFields={selectedLawFieldsComments} timeFrame={timeFrameComments} /> <br />
                </div>
            </div>
          </div>
        </div>
    );
}