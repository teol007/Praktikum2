import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";
import { lawFieldsArray } from "../../../Modules/Objects/lawFieldsArray";

interface QuestionStatisticsProps {
    users: UserCustomInfo[] | null,
    lawFields: string[] | null
}

export default function QuestionStatistics(props: QuestionStatisticsProps): JSX.Element {

    const [answers] = useAtom(answersDBAtom);
    const [questions] = useAtom(questionsDBAtom);
    let data: number[] = [];
    let dataLabels: string[] = [];

    if (props.users === null && props.lawFields !== null && props.lawFields.length > 0){
        data = props.lawFields.map(lawField => {
            let counter = 0;
            answers.forEach(answer => {
              const selectedQuestionIndex = questions.findIndex(question => question.id === answer.questionId);
              if (selectedQuestionIndex >= 0) {
                if (questions[selectedQuestionIndex].lawFields.includes(lawField)) {
                  counter++;
                }
              }
            });
          
            return counter;
          });
        dataLabels = props.lawFields;
    } else if (props.users !== null && props.lawFields !== null && props.users.length > 0) {
        props.lawFields.forEach((lawField) => {
            let counter = 0;
            answers.forEach((answer) => {
                const selectedQuestionIndex = questions.findIndex((question) => question.id === answer.questionId);
                if (selectedQuestionIndex > -1) {
                    const questionLawFields = questions[selectedQuestionIndex].lawFields;
                    if (questionLawFields.includes(lawField)) {
                        props.users?.forEach((user) => {
                            if (answer.authorUid === user.uid) {
                                counter++;
                            }
                        });
                    }
                }
            });
            data.push(counter);
        });
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
    } else if (props.users === null && props.lawFields === null){
        lawFieldsArray.forEach((lawField) => {
            let counter = 0;
            answers.forEach((answer) => {
                const selectedQuestionIndex = questions.findIndex(question => question.id === answer.questionId);
                if (selectedQuestionIndex >= 0) {
                  if (questions[selectedQuestionIndex].lawFields.includes(lawField)) {
                    counter++;
                  }
                }
            });
            data.push(counter);
            dataLabels.push(lawField);
        })
    }
    return (
        <div>
            <StatisticsGraph dataLabels={dataLabels} dataColors={['red']} data={data} graphLabel={"Število oddanih pravnih vprašanj"} />
        </div>
    );
}