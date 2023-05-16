import { Timestamp } from "@firebase/firestore";

export interface QuestionWithId {
    id: string;
    customerEmail: string;
    description: string;
    lawField: string;
    created: Timestamp;
    selectedRespondentUid: string;
}

export interface Question {
    customerEmail: string;
    description: string;
    lawField: string;
    created: Timestamp;
    selectedRespondentUid: string;
}
