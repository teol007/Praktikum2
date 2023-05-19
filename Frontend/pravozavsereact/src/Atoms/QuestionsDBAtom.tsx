import { atom } from 'jotai';
import { QuestionWithId } from '../Modules/Interfaces/Question';

const questionsDBAtom = atom<QuestionWithId[]>([]);

export { questionsDBAtom };
