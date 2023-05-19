import { atom } from 'jotai';

const lawFields: string[] = [
  'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
  'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'
];

const lawFieldsAtom = atom<string[]>(lawFields);

export { lawFieldsAtom };
