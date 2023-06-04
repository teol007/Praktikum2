import React from "react";
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";

interface LateStatisticsProps {
    users: UserCustomInfo[] | null,
    //lawFields: string[] | null
}

export default function LateStatistics(props: LateStatisticsProps): JSX.Element {

    const [answers] = useAtom(answersDBAtom);
    const [questions] = useAtom(questionsDBAtom);
    const [users] = useAtom(usersDBAtom);

    let data: number[] = [];
    let dataLabels: string[] = [];

    if (props.users === null){
        for (let i = 0; i < users.length; i++){
            let counter = 0;
            for (let j = 0; j < answers.length; j++){
                
            }
        }
    }

    return (
        <div>
            <StatisticsGraph dataLabels={dataLabels} dataColors={['red']} data={data} graphLabel={"Število dni zamude pri odgovorih"} />
        </div>
    );
}