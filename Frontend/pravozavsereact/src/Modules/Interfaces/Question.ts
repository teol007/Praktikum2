import { Timestamp } from "@firebase/firestore";

export interface QuestionWithId extends Question {
    id: string;
}

export interface Question {
    customerEmail: string;
    description: string;
    lawField: string;
    created: Timestamp;
    closed: boolean;
}
