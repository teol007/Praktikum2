import { atom } from 'jotai';
import { TestInterface } from '../Modules/Interfaces/TestInterfaces';

const test1Atom = atom<number>(0);
const test2Atom = atom<TestInterface>({name: 'Test', years: 100});

export { test1Atom, test2Atom };