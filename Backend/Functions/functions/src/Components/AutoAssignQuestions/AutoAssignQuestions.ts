import { logger } from "firebase-functions";
import { FirestoreEvent, QueryDocumentSnapshot } from "firebase-functions/v2/firestore";
import { Timestamp, getFirestore } from 'firebase-admin/firestore';
import { Group, Inactive, UserCustomInfo } from "../../Modules/Interfaces/UserCustomInfo";
import { Answer } from "../../Modules/Interfaces/Answer";
import { QuestionWithId } from "../../Modules/Interfaces/Question";
import { memoryOrganizationDocId } from "../../Config/OrganizationDocuments";
import { getMemory, getSettings } from "../../Modules/Functions/GetOrganizationsSpecificDoc";
const db = getFirestore();


const isUserActive = (authorInactive: Inactive): boolean => {
	const turningPoint = new Date();
	turningPoint.setDate(turningPoint.getDate() - 1); //inactive until 5th day means 5th day is still considered inactive
	return (
    turningPoint.getTime() > authorInactive.to.toDate().getTime() || (
      turningPoint.getTime() < authorInactive.to.toDate().getTime() && 
      new Date().getTime() < authorInactive.from.toDate().getTime() 
    )
  );
}

const sortByUid = (a: UserCustomInfo, b: UserCustomInfo): -1 | 0 | 1 => {
  if (a.uid < b.uid)
    return -1;

  if (a.uid > b.uid)
    return 1;

  return 0;
};

const get1stAfterLastAssignedOne = (lastAssignedUid: string, queue: UserCustomInfo[]): UserCustomInfo|null => {
  if(queue.length <= 0)
    return null;

  queue.sort(sortByUid);
  for(let i=0; i<queue.length; i++)
    if(queue[i].uid > lastAssignedUid) //First one with bigger uid
      return queue[i];

  return queue[0];
}

/**
 * Automatically assigns question to active authors in queue
 * Works only if autoAssignQuestions===true in document inside "Questions" collection with id specified in "config/organizationDocumentId.ts".
 * This does not include authors that are inactive
 */
export const autoAssignQuestions = async (event: FirestoreEvent<QueryDocumentSnapshot | undefined, {questionId: string}>) => {
  try {
	  const snapshot = event.data;
  	if (!snapshot) {
  	  logger.warn("autoAssignQuestions: No data associated with the event");
  	  return;
  	}

    const settings = await getSettings();
	  const isAutoAssignOn = settings.autoAssignQuestions;
	  if(isAutoAssignOn != true)
    	return;

 		const createdQuestionData: QuestionWithId = {
			id: snapshot.id,
			customerEmail: snapshot.data().customerEmail,
			description: snapshot.data().description,
			relatesToQuestionId: snapshot.data().relatesToQuestionId,
			lawFields: snapshot.data().lawFields,
			created: snapshot.data().created,
			closed: snapshot.data().closed
		}
		const users: UserCustomInfo[] = (await db.collection('Users').get()).docs.map((doc): UserCustomInfo => {
			return {
				fullName: doc.data().fullName, 
				academicTitle: doc.data().academicTitle, 
				email: doc.data().email, 
				group: doc.data().group,
				lawFields: doc.data().lawFields,
				inactive: doc.data().inactive,
				uid: doc.data().uid,
			}
		});

		const compatibleAuthors = users.filter((user) => (user.group===Group.Author && isUserActive(user.inactive)));

    const memory = await getMemory();
		const chosenAuthor = get1stAfterLastAssignedOne(memory.lastAssignedUid, compatibleAuthors);
		if(!chosenAuthor)
      return;
    
    const newAnswer: Answer = {
      questionId: createdQuestionData.id,
      authorUid: chosenAuthor.uid,
      authorAssigned: Timestamp.now(),
      tags: [],
      answered: null,
      responses: [],
      published: null,
      fileUrl: ""
    };

    await db.collection('Organizations').doc(memoryOrganizationDocId).update({lastAssignedUid: chosenAuthor.uid});
    await db.collection('Answers').add(newAnswer);
	} catch(error) {
		logger.error(error);
	}
};
