import { Timestamp } from "firebase-admin/firestore";

export interface QuestionWithId extends Question {
    id: string;
}

export interface Question {
    customerEmail: string;
    description: string;
    relatesToQuestionId: string | null;
    lawField: string;
    created: Timestamp;
    closed: boolean;
}
