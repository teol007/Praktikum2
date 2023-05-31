import { atom } from 'jotai';
import { SettingsOrganizationDocWithId } from '../Modules/Interfaces/OrganizationsDocs';

const settingsOrganizationsDBAtom = atom<SettingsOrganizationDocWithId|undefined>(undefined);

export { settingsOrganizationsDBAtom };
