import React from "react";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { Chart } from 'primereact/chart';
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { lawFieldsArray } from "../../../Modules/Objects/lawFieldsArray";

interface CommentsStatisticsProps {
    users: UserCustomInfo[] | null,
    lawFields: string[] | null
}

export default function CommentsStatistics(props: CommentsStatisticsProps): JSX.Element {

    const [answers] = useAtom(answersDBAtom);
    const [questions] = useAtom(questionsDBAtom);
    const [users] = useAtom(usersDBAtom);

    const strinjamSeData = [];
    const neStrinjamSeData = [];
    const mocnoNeStrinjamSeData = [];
    const labelsUsers = [];

    if (props.users !== null && props.users?.length > 0 && props.lawFields === null){

        for (let i = 0; i<props.users.length; i++){
            let strinjamSeCounter = 0;
            let neStrinjamSeCounter = 0;
            let mocnoNeStrinjamSeCounter = 0;
            for (let j = 0; j < answers.length; j++){
                if (answers[j].responses.length > 0){
                    for (let u = 0; u < answers[j].responses.length; u++){
                        if (answers[j].responses[u].commenterUid === props.users[i].uid){
                            switch (answers[j].responses[u].status) {
                                case "Good":
                                    strinjamSeCounter++
                                    console.log("JA")
                                    break;
                                case "Bad":
                                    neStrinjamSeCounter++
                                    console.log("MBY")
                                    break;
                                case "Very bad":
                                    mocnoNeStrinjamSeCounter++;
                                    console.log("NE")
                                    break;
                                default:
                                    break;
                            }
                        }
                    }    
                }
            }
            strinjamSeData.push(strinjamSeCounter);
            neStrinjamSeData.push(neStrinjamSeCounter);
            mocnoNeStrinjamSeData.push(mocnoNeStrinjamSeCounter);
            labelsUsers.push(props.users[i].fullName)
        }
    } else if (props.users !== null && props.lawFields !== null && props.lawFields.length > 0 && props.users.length > 0){
        for (let i = 0; i<props.users.length; i++){
            let strinjamSeCounter = 0;
            let neStrinjamSeCounter = 0;
            let mocnoNeStrinjamSeCounter = 0;

            for (let j = 0; j < answers.length; j++){
                if (answers[j].responses.length > 0){
                    for (let u = 0; u < answers[j].responses.length; u++){
                        for (let o = 0; o < props.lawFields.length; o++){
                            let selectedQuestionIndex = questions.findIndex(question => question.id === answers[j].questionId);
                            if (selectedQuestionIndex > -1){
                                if (answers[j].responses[u].commenterUid === props.users[i].uid && questions[selectedQuestionIndex].lawFields.includes(props.lawFields[o])){
                                    switch (answers[j].responses[u].status) {
                                        case "Good":
                                            strinjamSeCounter++
                                            break;
                                        case "Bad":
                                            neStrinjamSeCounter++
                                            break;
                                        case "Very bad":
                                            mocnoNeStrinjamSeCounter++;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }    
                }
            }
            strinjamSeData.push(strinjamSeCounter);
            neStrinjamSeData.push(neStrinjamSeCounter);
            mocnoNeStrinjamSeData.push(mocnoNeStrinjamSeCounter);
            labelsUsers.push(props.users[i].fullName)
        }
    } else if (props.users === null && props.lawFields === null){
        for (let i = 0; i < users.length; i++){
            let strinjamSeCounter = 0;
            let neStrinjamSeCounter = 0;
            let mocnoNeStrinjamSeCounter = 0;
            for (let j = 0; j < answers.length; j++){
                if (answers[j].responses.length > 0){
                    for (let u = 0; u < answers[j].responses.length; u++){
                        for (let o = 0; o < lawFieldsArray.length; o++){
                            let selectedQuestionIndex = questions.findIndex(question => question.id === answers[j].questionId);
                            if (selectedQuestionIndex > -1){
                                if (answers[j].responses[u].commenterUid ===users[i].uid && questions[selectedQuestionIndex].lawFields.includes(lawFieldsArray[o])){
                                    switch (answers[j].responses[u].status) {
                                        case "Good":
                                            strinjamSeCounter++
                                            break;
                                        case "Bad":
                                            neStrinjamSeCounter++
                                            break;
                                        case "Very bad":
                                            mocnoNeStrinjamSeCounter++;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }    
                }
            }
            strinjamSeData.push(strinjamSeCounter);
            neStrinjamSeData.push(neStrinjamSeCounter);
            mocnoNeStrinjamSeData.push(mocnoNeStrinjamSeCounter);
            labelsUsers.push(users[i].fullName)
        }
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
        labels: labelsUsers,
        datasets: [
            {
                label: 'Strinjam se',
                backgroundColor: 'rgb(30, 223, 30)',
                data: strinjamSeData
            },
            {
                label: 'Ne strinjam se',
                backgroundColor: 'orange',
                data: neStrinjamSeData
            },
            {
                label: 'Močno se ne strinjam',
                backgroundColor: 'red',
                data: mocnoNeStrinjamSeData
            },
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

  return (
    <div className="card">
        <Chart type="bar" data={data} options={options} />
    </div>
  );
}