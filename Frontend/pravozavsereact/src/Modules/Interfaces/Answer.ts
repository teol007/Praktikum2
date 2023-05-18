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

export interface Answer {
    questionId: string;
    authorUid: string | undefined;
    title: string;
    content: string;
    created: Timestamp;
    published: Timestamp | null;
    responses: Response[];
}

export interface AnswerWithId {
    id: string;
    questionId: string;
    authorUid: string;
    title: string;
    content: string;
    created: Timestamp;
    published: Timestamp | null;
    responses: Response[];
}
