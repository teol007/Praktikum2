import { Timestamp } from "firebase/firestore";

export enum Status {
    Good = 'Good',
    Bad = 'Bad',
    VeryBad = 'Very bad'
}

export interface Response {
    commenterUid: string;
    created: Timestamp;
    status: Status;
    description: string;
}

export interface AnswerWithId extends Answer {
    id: string;
}

export interface Answer {
    questionId: string;
    authorUid: string | undefined;
    authorAssigned: Timestamp | null;
    tags: string[];
    answered: Timestamp | null;
    responses: Response[];
    published: Timestamp | null;
    fileUrl: string;
}