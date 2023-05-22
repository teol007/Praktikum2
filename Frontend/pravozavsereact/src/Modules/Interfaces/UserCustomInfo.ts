import { Timestamp } from "@firebase/firestore";

export enum Group {
    Unconfirmed = 'Unconfirmed',
    Author = 'Author',
    Manager = 'Manager'
}

export interface Inactive {
    from: Timestamp;
    to: Timestamp;
}

export interface UserCustomInfo {
    fullName: string;
    academicTitle: string;
    email: string;
    group: Group | string;
    lawFields: string[];
    inactive: Inactive;
    uid: string;
}