import { atom } from 'jotai';
import { QuestionWithId } from '../Modules/Interfaces/Question';

const questionsAtom = atom<QuestionWithId[]>([]);

export { questionsAtom };
