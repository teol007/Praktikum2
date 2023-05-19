import { Timestamp } from "firebase/firestore";

export enum Status {
    Good = 'Good',
    Bad = 'Bad',
    VeryBad = 'VeryBad'
}

export interface Response {
    commenterUid: string;
    created: Timestamp;
    description: string;
    status: Status;
}

export interface AnswerWithId extends Answer {
    id: string;
}

export interface Answer {
    questionId: string;
    authorUid: string | undefined;
    title: string;
    content: string;
    answered: Timestamp | null;
    responses: Response[];
    published: Timestamp | null;
}
