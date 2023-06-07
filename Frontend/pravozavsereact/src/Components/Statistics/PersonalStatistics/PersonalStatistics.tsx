import React from "react";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import { responseStatusArray } from "../../../Modules/Objects/responseStatusArray";
import { lawFieldsArray } from "../../../Modules/Objects/lawFieldsArray";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import LateStatistics from "../LateStatistics/LateStatistics";

export default function PersonalStatistics(): JSX.Element {

    const [user] = useAtom(userAuthentication);
    const [questions] = useAtom(questionsDBAtom);
    const [answers] = useAtom(answersDBAtom);
    let dataStrinjamSe = 0;
    let dataNeStrinjamSe = 0;
    let dataMocnoNeStrinjamSe = 0;
    let questionsData = [];

    for (let i = 0; i<answers.length; i++){
        if (answers[i].responses.length > 0){
            for (let j = 0; j<answers[i].responses.length; j++) {
                if (answers[i].responses[j].commenterUid === user?.uid){   
                    switch (answers[i].responses[j].status) {
                        case "Good":
                            dataStrinjamSe++;
                            break;
                        case "Bad":
                            dataNeStrinjamSe++;
                            break;
                        case "Very bad":
                            dataMocnoNeStrinjamSe++;
                            break;
                    }
                }
            }
        }
    }

    if (lawFieldsArray.length>0){
        for (let i = 0; i< lawFieldsArray.length; i++){
            let counter = 0;
            for (let j = 0; j < questions.length; j++) {
                let selectedAnswerIndex = answers.findIndex(answer => answer.questionId === questions[j].id);
                if (selectedAnswerIndex > -1) {
                    if (answers[selectedAnswerIndex].authorUid === user?.uid && questions[j].lawFields.includes(lawFieldsArray[i])) {
                        counter++;
                    }
                }
            }
            questionsData.push(counter);
        }
    }
    const dataArray = [dataStrinjamSe, dataNeStrinjamSe, dataMocnoNeStrinjamSe]
    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{marginTop: "10px"}}>
                    <h4>Graf mojih odgovorov na vprašanja</h4>
                    <StatisticsGraph dataLabels={lawFieldsArray} dataColors={['red']} data={questionsData} graphLabel={"Število odgovorov glede na posamezno pravno področje"} />
                </div>
                <div className="col" style={{marginTop: "10px"}}>
                    <h4>Graf mojih komentarjev</h4>
                    <StatisticsGraph dataLabels={responseStatusArray} dataColors={['rgb(30, 223, 30)','orange','red']} data={dataArray} graphLabel={"Tipi ocen komentarjev"} />
                </div>
            </div>
            <div>
                <h4 style={{marginTop: "10px"}}>Graf mojih zamud</h4>
                 <LateStatistics user={user} timeFrame={null} />
            </div>
        </div>
    );
}