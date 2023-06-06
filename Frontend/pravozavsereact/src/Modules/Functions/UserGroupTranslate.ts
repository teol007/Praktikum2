import { Group } from "../Interfaces/UserCustomInfo";

export const userGroupToSlovenian = (group: Group|string): string => {
  switch(group) {
    case Group.Unconfirmed: return 'Neopredeljen';
    case Group.Author: return 'Avtor';
    case Group.Manager: return 'Urednik';
    default: return 'Neznano';
  }
}
