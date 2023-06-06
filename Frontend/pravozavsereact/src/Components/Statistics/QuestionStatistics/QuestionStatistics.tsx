import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";
import { lawFieldsArray } from "../../../Modules/Objects/lawFieldsArray";
import { isBefore } from "../../../Modules/Functions/DateConverters";

interface QuestionStatisticsProps {
    users: UserCustomInfo[] | null,
    lawFields: string[] | null,
    timeFrame: Date[] | null | undefined
}

export default function QuestionStatistics(props: QuestionStatisticsProps): JSX.Element {

    const [answers] = useAtom(answersDBAtom);
    const [questions] = useAtom(questionsDBAtom);
    let data: number[] = [];
    let dataLabels: string[] = [];

    if (props.users !== null && props.lawFields !== null && props.lawFields.length > 0 && props.users.length === 0){//izbere se lawfield, avtor pa ne
        data = props.lawFields.map(lawField => {
            let counter = 0;
            answers.forEach(answer => {
              const selectedQuestionIndex = questions.findIndex(question => question.id === answer.questionId);
              if (selectedQuestionIndex >= 0) {
                if (questions[selectedQuestionIndex].lawFields.includes(lawField)) {
                    if (props.timeFrame !== null && props.timeFrame !== undefined && props.timeFrame.length === 2 && props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                        if(props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                            if (answer.answered){
                                if (isBefore(answer.answered.toDate(), props.timeFrame[0], ) || isBefore(props.timeFrame[1], answer.answered.toDate())){
                                } else {
                                    counter++;
                                }
                            }
                        }
                    } else {
                        counter++;
                    }
                }
              }
            });
            return counter;
          });
        dataLabels = props.lawFields;
    } else if (props.users !== null && props.lawFields !== null && props.users.length > 0 && props.lawFields.length > 0) {//izbere se avtor IN lawfield
        props.lawFields.forEach((lawField) => {
            let counter = 0;
            answers.forEach((answer) => {
                const selectedQuestionIndex = questions.findIndex((question) => question.id === answer.questionId);
                if (selectedQuestionIndex > -1) {
                    const questionLawFields = questions[selectedQuestionIndex].lawFields;
                    if (questionLawFields.includes(lawField)) {
                        props.users?.forEach((user) => {
                            if (answer.authorUid === user.uid) {
                                if (props.timeFrame !== null && props.timeFrame !== undefined && props.timeFrame.length === 2 && props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                                    if(props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                                        if (answer.answered){
                                            if (isBefore(answer.answered.toDate(), props.timeFrame[0], ) || isBefore(props.timeFrame[1], answer.answered.toDate())){
                                            } else {
                                                counter++;
                                            }
                                        }
                                    }
                                } else {
                                    counter++;
                                }
                            }
                        });
                    }
                }
            });
            data.push(counter);
        });
        dataLabels = props.lawFields;
    } else if (props.users !== null && props.lawFields !== null && props.users.length > 0 && props.lawFields.length === 0){//izbere se avtor, lawfield pa ne
        for (let i = 0; i < props.users.length; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                let selectedQuestionIndex = questions.findIndex(question => question.id === answers[j].questionId);
                if (selectedQuestionIndex > -1){
                    if (answers[j].authorUid === props.users[i].uid){
                        if (props.timeFrame !== null && props.timeFrame !== undefined && props.timeFrame.length === 2 && props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                            if(props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                                if (answers[j].answered){
                                    if (isBefore(answers[j].answered!.toDate(), props.timeFrame[0], ) || isBefore(props.timeFrame[1], answers[j].answered!.toDate())){
                                    } else {
                                        counter++;
                                    }
                                }
                            }
                        } else {
                            counter++;
                        }
                    }
                }
            }
            data.push(counter);
            counter = 0;
            dataLabels.push(props.users[i].fullName);
        }
    } else if (props.users !== null && props.lawFields !== null && props.lawFields.length === 0 && props.users.length === 0){ //ne izbere se niti avtor, niti lawfield
        lawFieldsArray.forEach((lawField) => {
            let counter = 0;
            answers.forEach((answer) => {
                if (answer.answered !== null){
                    const selectedQuestionIndex = questions.findIndex(question => question.id === answer.questionId);
                    if (selectedQuestionIndex >= 0) {
                        if (questions[selectedQuestionIndex].lawFields.includes(lawField)) {
                            if (props.timeFrame !== null && props.timeFrame !== undefined && props.timeFrame.length === 2 && answer.answered !== null && props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                                if(props.timeFrame[0] !== null && props.timeFrame[1] !== null){
                                    if (answer.answered){
                                        if (isBefore(answer.answered.toDate(), props.timeFrame[0], ) || isBefore(props.timeFrame[1], answer.answered.toDate())){
                                        } else {
                                            counter++;
                                        }
                                    }
                                }
                            } else {
                                counter++;
                            }
                        }
                    }
                }
                
            });
            data.push(counter);
            dataLabels.push(lawField);
        })
    }
    let numberOfAnsweredQuestions: number = 0;
    questions.forEach(question => {
        if (question.closed){
            numberOfAnsweredQuestions++;
        }
    });
    return (
        <div>
            <div className="card">
                <p>Število vseh prejetih vprašanj je: <b>{questions.length}</b></p>
                <p>Število vseh dokončno odgovorjenih vprašanj je: <b>{numberOfAnsweredQuestions}</b></p>
            </div>
            <StatisticsGraph dataLabels={dataLabels} dataColors={['red']} data={data} graphLabel={"Število oddanih pravnih vprašanj"} />
        </div>
    );
}