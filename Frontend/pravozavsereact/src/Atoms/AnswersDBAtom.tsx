import { atom } from 'jotai';
import { AnswerWithId } from '../Modules/Interfaces/Answer';

const answersDBAtom = atom<AnswerWithId[]>([]);

export { answersDBAtom };
