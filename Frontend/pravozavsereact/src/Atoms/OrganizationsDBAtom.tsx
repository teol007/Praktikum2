import { atom } from 'jotai';
import { SettingsOrganizationDocWithId } from '../Modules/Interfaces/OrganizationsDocs';

const organizationsDBAtom = atom<SettingsOrganizationDocWithId|undefined>(undefined);

export { organizationsDBAtom };
