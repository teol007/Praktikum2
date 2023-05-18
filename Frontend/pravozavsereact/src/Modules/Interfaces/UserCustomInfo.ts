export enum Group {
    Unconfirmed = 'Unconfirmed',
    Author = 'Author',
    Manager = 'Manager'
}

export interface UserCustomInfo {
    fullName: string;
    academicTitle: string;
    email: string;
    group: Group | string;
    lawFields: string[];
    uid: string;
}