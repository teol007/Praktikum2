import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { getAnswerDeadlineDate, isBefore, timeBetweenDatesDaysNumber } from "../../../Modules/Functions/DateConverters";

interface LateStatisticsProps {
    user: UserCustomInfo | undefined,
    timeFrame: Date[] | null
}

export default function LateStatistics(props: LateStatisticsProps): JSX.Element {

    const [answers] = useAtom(answersDBAtom);
    const [users] = useAtom(usersDBAtom);
    let data: number[] = [];
    let dataLabels: string[] = [];

    if (props.user === undefined && users.length > 0){
        for (let i = 0; i < 14; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                //default je nastavljeno na Maja Prosenjak, da se sploh kaj vidi (drugi nimajo zamud)
                if (answers[j].authorUid === users[1].uid /* && answers[j].answered !== null */ && answers[j].authorAssigned !== undefined){
                    const deadline = getAnswerDeadlineDate(answers[j].authorAssigned?.toDate()!);
                    if (answers[j].answered !== null){
                        if (isBefore(deadline,answers[j].answered?.toDate()! )){
                            const razlika: number = timeBetweenDatesDaysNumber(deadline, answers[j].answered?.toDate()!);
                            if (razlika === (i + 1)){
                                counter++;
                            }
                        }
                    } else {
                        let currentDate: Date = new Date();
                        if (isBefore(deadline, currentDate)){
                            const razlika: number = timeBetweenDatesDaysNumber(deadline, currentDate);
                            if(razlika === (i + 1)){
                                counter++;
                            } else if (i === 13 && razlika >= (i + 1)){
                                counter++;
                            }
                        }
                    }

                }
            }
            data.push(counter);
            if (i < 13){
                dataLabels.push((i + 1).toString() + " dni");
            } else {
                dataLabels.push("14+ dni");
            }
        }
    } else if (props.user !== undefined){
        for (let i = 0; i < 14; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                if (answers[j].authorUid === props.user.uid /* && answers[j].answered !== null */ && answers[j].authorAssigned !== undefined){
                    const deadline: Date = getAnswerDeadlineDate(answers[j].authorAssigned?.toDate()!);
                    if (answers[j].answered !== null){
                        if (isBefore(deadline, answers[j].answered?.toDate()!)){
                            const razlika: number = timeBetweenDatesDaysNumber(deadline, answers[j].answered?.toDate()!);
                            if (razlika === (i + 1)){
                                counter++;
                            }
                        }
                    } else {
                        let currentDate: Date = new Date();
                        if (isBefore(deadline, currentDate)){
                            const razlika: number = timeBetweenDatesDaysNumber(deadline, currentDate);
                            if(razlika === (i + 1)){
                                counter++;
                            } else if (i === 13 && razlika >= (i + 1)){
                                counter++;
                            }
                        }
                    }
                }
            }
            data.push(counter);
            if (i < 13){
                dataLabels.push((i + 1).toString() + " dni");
            } else {
                dataLabels.push("14+ dni");
            }
        }
    }

    return (
        <div>
            <StatisticsGraph dataLabels={dataLabels} dataColors={['red']} data={data} graphLabel={"Število zamud za določeno število dni"} />
        </div>
    );
}