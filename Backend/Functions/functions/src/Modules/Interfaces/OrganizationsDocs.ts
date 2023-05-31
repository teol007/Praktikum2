export interface SettingsOrganizationDocWithId extends SettingsOrganizationDoc {
    id: string;
}
export interface SettingsOrganizationDoc {
    autoAssignQuestions: boolean;
    autoSendAnswers: boolean;
}


export interface MemoryOrganizationDocWithId extends MemoryOrganizationDoc {
    id: string;
}
export interface MemoryOrganizationDoc {
    lastAssignedUid: string;
}

