export interface OrganizationWithId extends Organization {
    id: string;
}

export interface Organization {
    autoAssignQuestions: boolean;
    autoSendAnswers: boolean;
}
