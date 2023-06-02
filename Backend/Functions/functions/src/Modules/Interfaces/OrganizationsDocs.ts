export interface SettingsOrganizationDocWithId extends SettingsOrganizationDoc {
    id: string;
}
export interface SettingsOrganizationDoc {
    autoAssignQuestions: boolean;
    autoSendAnswers: boolean;
    autoSendAuthors: boolean;
    autoSendQuestionReceived: boolean;
}


export interface MemoryOrganizationDocWithId extends MemoryOrganizationDoc {
    id: string;
}
export interface MemoryOrganizationDoc {
    lastAssignedUid: string;
}

export interface PublishOrganizationDocWithId extends PublishOrganizationDoc {
    id: string;
}
export interface PublishOrganizationDoc {
    lastPublishedAnswerId: string;
}

export interface ReassignedAuthorOrganizationDocWithId extends ReassignedAuthorOrganizationDoc {
    id: string;
}
export interface ReassignedAuthorOrganizationDoc {
    answerId: string;
    lastAssignedAnswerAuthorUid: string;
    newReassignedAnswerAuthorUid: string;
}