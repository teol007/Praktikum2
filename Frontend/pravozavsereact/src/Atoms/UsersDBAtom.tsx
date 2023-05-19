import { atom } from 'jotai';
import { UserCustomInfo } from '../Modules/Interfaces/UserCustomInfo';

const usersDBAtom = atom<UserCustomInfo[]>([]);

export { usersDBAtom };
