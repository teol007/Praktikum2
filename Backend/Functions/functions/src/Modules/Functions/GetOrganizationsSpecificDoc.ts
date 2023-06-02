import { settingsOrganizationDocId, memoryOrganizationDocId } from "../../Config/OrganizationDocuments";
import { SettingsOrganizationDocWithId, SettingsOrganizationDoc, MemoryOrganizationDocWithId, MemoryOrganizationDoc } from "../Interfaces/OrganizationsDocs";
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

const getOrganizations = async (): Promise<FirebaseFirestore.DocumentData[]> => {
  const organizations: FirebaseFirestore.DocumentData[] = [];
  const organizationsSnapshot = await db.collection('Organizations').get();
  organizationsSnapshot.forEach(doc => {
     const document = { id: doc.id, ...doc.data() };
     organizations.push(document);
  });
  
  return organizations;
}

export const getSettings = async (): Promise<SettingsOrganizationDocWithId> => {  
  const organizations = await getOrganizations();
  const wantedDocId = settingsOrganizationDocId;
  const settingsDoc = organizations.find((organization) => (organization.id === wantedDocId));
  const settings: SettingsOrganizationDocWithId = {
    id: wantedDocId,
    autoAssignQuestions: false,
    autoSendAnswers: false,
    autoSendAuthors: false,
    autoSendQuestionReceived: false
  };

  if(!settingsDoc) {
    const newSettings: SettingsOrganizationDoc = {
      autoAssignQuestions: settings.autoAssignQuestions,
      autoSendAnswers: settings.autoSendAnswers,
      autoSendAuthors: settings.autoSendAuthors,
      autoSendQuestionReceived: settings.autoSendQuestionReceived
    };
    await db.collection('Organizations').doc(wantedDocId).set(newSettings);
    return settings;
  }
  
  settings.autoAssignQuestions = settingsDoc.autoAssignQuestions;
  settings.autoSendAnswers = settingsDoc.autoSendAnswers;
  settings.autoSendAuthors = settingsDoc.autoSendAuthors;
  settings.autoSendQuestionReceived = settingsDoc.autoSendQuestionReceived;

  return settings;
}

export const getMemory = async (): Promise<MemoryOrganizationDocWithId> => {
  const organizations = await getOrganizations();

  const wantedDocId = memoryOrganizationDocId;
  const memoryDoc = organizations.find((organization) => (organization.id === wantedDocId));
  const memory: MemoryOrganizationDocWithId = {
    id: wantedDocId,
    lastAssignedUid: ""
  };

  if(!memoryDoc) {
    const newMemory: MemoryOrganizationDoc = {
      lastAssignedUid: memory.lastAssignedUid
    };
    await db.collection('Organizations').doc(wantedDocId).set(newMemory);
  }
  else {
    memory.lastAssignedUid = memoryDoc.lastAssignedUid;
  }

  return memory;
}
