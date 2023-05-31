export interface SettingsOrganizationDocWithId extends SettingsOrganizationDoc {
    id: string;
}

export interface SettingsOrganizationDoc {
    autoAssignQuestions: boolean;
    autoSendAnswers: boolean;
}
