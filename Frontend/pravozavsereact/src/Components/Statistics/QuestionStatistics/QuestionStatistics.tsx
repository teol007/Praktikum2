import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";

interface QuestionStatisticsProps {
    users: UserCustomInfo[] | null,
    lawFields: string[] | null
}

export default function QuestionStatistics(props: QuestionStatisticsProps): JSX.Element {

    const [answers] = useAtom(answersDBAtom);
    const [questions] = useAtom(questionsDBAtom);
    const data: number[] = [];
    let dataLabels: string[] = [];

    if (props.users === null && props.lawFields !== null && props.lawFields.length > 0){
        for (let i = 0; i < props.lawFields.length; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                let selectedQuestionIndex = questions.findIndex(question => question.id === answers[j].questionId);
                if (selectedQuestionIndex >= 0){
                    if (questions[selectedQuestionIndex].lawField === props.lawFields[i]){
                        counter++;
                    }
                }
            }
            data.push(counter);
            counter = 0;
        }
        dataLabels = props.lawFields;
    } else if (props.users !== null && props.lawFields !== null && props.users.length > 0) {
        for (let i = 0; i < props.lawFields.length; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                let selectedQuestionIndex = questions.findIndex(question => question.id === answers[j].questionId);
                if (selectedQuestionIndex > -1){
                    if (questions[selectedQuestionIndex].lawField === props.lawFields[i]){
                        for (let u = 0; u < props.users.length; u++){
                            if (answers[j].authorUid === props.users[u].uid){
                                counter++;
                            }
                        }
                    }
                }
            }
            data.push(counter);
            counter = 0;
        }
        dataLabels = props.lawFields;
    } else if (props.users !== null && props.lawFields === null && props.users.length > 0){
        for (let i = 0; i < props.users.length; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                let selectedQuestionIndex = questions.findIndex(question => question.id === answers[j].questionId);
                if (selectedQuestionIndex > -1){
                    if (answers[j].authorUid === props.users[i].uid){
                        counter++;
                    }
                }
            }
            data.push(counter);
            counter = 0;
            dataLabels.push(props.users[i].fullName);
        }
    }
    return (
        <div>
            <StatisticsGraph dataLabels={dataLabels} dataColors={['red']} data={data} graphLabel={"Število oddanih pravnih vprašanj"} />
        </div>
    );
}