import { atom } from 'jotai';
import { OrganizationWithId } from '../Modules/Interfaces/Organizations';

const organizationsDBAtom = atom<OrganizationWithId[]>([]);

export { organizationsDBAtom };
