import { getFirestore } from 'firebase-admin/firestore';
import { Email } from "../../Modules/Interfaces/Email";
import { getSettings } from '../../Modules/Functions/GetOrganizationsSpecificDoc';
const db = getFirestore();


export const sendEmailAuthors = async (email: Email): Promise<void> => {
  const settings = await getSettings();
  const isautoSendAuthorsOn = settings.autoSendAuthors;
  if(isautoSendAuthorsOn != true)
    return;
      
  await db.collection('AutoEmails').add(email);
}

export const sendEmailAnswer = async (email: Email): Promise<boolean> => {
  const settings = await getSettings();
	const isautoSendAnswersOn = settings.autoSendAnswers;
	if(isautoSendAnswersOn != true)
    return false;
  
  await db.collection('AutoEmails').add(email);
  return true;
}