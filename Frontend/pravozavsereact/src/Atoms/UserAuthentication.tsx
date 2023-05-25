import { atom } from 'jotai';
import { UserCustomInfo } from '../Modules/Interfaces/UserCustomInfo';

const userAuthentication = atom<UserCustomInfo|undefined>(undefined);

export { userAuthentication };
