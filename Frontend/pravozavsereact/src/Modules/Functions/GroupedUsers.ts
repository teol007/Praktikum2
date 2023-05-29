import { QuestionWithId } from "../Interfaces/Question";
import { Group, UserCustomInfo } from "../Interfaces/UserCustomInfo";

interface DropdownGroup {
  label: string;
  items: DropdownItem[];
}
  
interface DropdownItem {
  label: string;
  value: UserCustomInfo;
}

const uredniki = (users: UserCustomInfo[]) => (users.filter((user)=>(user.group===Group.Manager)));
const authors = (users: UserCustomInfo[]) => (users.filter((user)=>(user.group===Group.Author)));
const authorsOfLawFields = (users: UserCustomInfo[], wantedLawFields: string[]) => (authors(users).filter((author) => (author.lawFields.some((lawField) => (wantedLawFields.includes(lawField))))));
const authorsNotOfLawFields = (users: UserCustomInfo[], wantedLawFields: string[]) => (authors(users).filter((author) => (!author.lawFields.some((lawField) => (wantedLawFields.includes(lawField))))));
export const groupedUsers = (users: UserCustomInfo[], question: QuestionWithId|undefined|null): DropdownGroup[] => {
  if(!question)
    return ([
      {label: 'Vsi avtorji', items: authors(users).map((author)=>({label: author.academicTitle+' '+author.fullName, value: author}))},
      {label: 'Uredniki', items: uredniki(users).map((urednik)=>({label: urednik.academicTitle+' '+urednik.fullName, value: urednik}))}
    ]);

  return ([
  {
    label: 'Avtorji na ustreznih pravnih področij',
    items: authorsOfLawFields(users, question.lawFields).map((author)=>({label: author.academicTitle+' '+author.fullName, value: author}))
  },
  {
    label: 'Ostali',
    items: authorsNotOfLawFields(users, question.lawFields).map((author)=>({label: author.academicTitle+' '+author.fullName, value: author}))
  },
  {
    label: 'Uredniki',
    items: uredniki(users).map((urednik)=>({label: urednik.academicTitle+' '+urednik.fullName, value: urednik}))
  }
])};
