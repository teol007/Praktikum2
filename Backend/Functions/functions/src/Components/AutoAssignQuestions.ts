import { logger } from "firebase-functions";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { Timestamp, getFirestore } from 'firebase-admin/firestore';
import { Group, Inactive, UserCustomInfo } from "../Modules/Interfaces/UserCustomInfo";
import { Answer, AnswerWithId } from "../Modules/Interfaces/Answer";
import { QuestionWithId } from "../Modules/Interfaces/Question";
import { organizationDocumentId } from "../Config/OrganizationDocumentId";
import { Organization } from "../Modules/Interfaces/Organizations";
const db = getFirestore();

const getAuthorWithLeastAnswers = (authors: UserCustomInfo[], answers: AnswerWithId[]): UserCustomInfo|undefined => {
	const authorHasAnswersCounts: {[authorId: string]: number} = {};

  	// Count the number of answers for each author
  	answers.forEach(answer => {
			if(!answer.authorUid)
				return;

  	  const authorId = answer.authorUid;
  	  authorHasAnswersCounts[authorId] = (authorHasAnswersCounts[authorId] ?? 0) + 1;
  	});

  	// Find the author with the least number of answers
  	let leastAnswers = Infinity;
  	let authorWithLeastAnswers: UserCustomInfo | undefined;

  	authors.forEach(author => {
  	  const authorId = author.uid;
  	  const answerCount = authorHasAnswersCounts[authorId] ?? 0;

  	  if (answerCount < leastAnswers) {
  	    	leastAnswers = answerCount;
  	    	authorWithLeastAnswers = author;
  	  }
  	});

  	return authorWithLeastAnswers;
}

const isAuthorActive = (authorInactive: Inactive): boolean => {
	const turningPoint = new Date();
	turningPoint.setDate(turningPoint.getDate() - 1); //inactive until 5th day means 5th day is still considered inactive

	return (
		turningPoint.getTime() > authorInactive.to.toDate().getTime() || (
			turningPoint.getTime() < authorInactive.to.toDate().getTime() &&
			new Date().getTime() < authorInactive.from.toDate().getTime()
		)
	)
}

/**
 * Automatically assigns question to active author with specified lawField that has the least amount of answers assigned.
 * Works only if autoAssignQuestions===true in document inside "Questions" collection with id specified "config/organizationDocumentId.ts".
 * This does not include authors that are inactive
 */
export const autoAssignQuestions = onDocumentCreated("Questions/{questionId}", async (event) => {
  try {
		const snapshot = event.data;
  		if (!snapshot) {
  		    logger.warn("autoAssignQuestions: No data associated with the event");
  		    return;
  		}

		const organizationData = await db.doc('Organizations/'+organizationDocumentId).get();
		if(!organizationData.exists) {
			const mainOrganizationDocument: Organization = {
				autoAssignQuestions: false,
				autoSendAnswers: false
			};
			await db.collection('Organizations').doc(organizationDocumentId).set(mainOrganizationDocument);
		}

	  const isAutoAssignOn = organizationData.data()?.autoAssignQuestions;
	  if(isAutoAssignOn != true)
    	return;

 		const createdQuestionData: QuestionWithId = {
			id: snapshot.id,
			customerEmail: snapshot.data().customerEmail,
			description: snapshot.data().description,
			relatesToQuestionId: snapshot.data().relatesToQuestionId,
			lawField: snapshot.data().lawField,
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
		const answers: AnswerWithId[] = (await db.collection('Answers').get()).docs.map((doc): AnswerWithId => {
			return {
				id: doc.id, 
				questionId: doc.data().questionId, 
				authorUid: doc.data().authorUid, 
				authorAssigned: doc.data().authorAssigned,
				tags: doc.data().tags, 
				answered: doc.data().answered, 
				responses: doc.data().responses, 
				published: doc.data().published,
				fileUrl: doc.data().fileUrl
			}
		});

		const compatibleAuthors = users.filter((user) => (
			user.group===Group.Author && 
			user.lawFields.includes(createdQuestionData.lawField) && 
			isAuthorActive(user.inactive)
		));

		const chosenAuthor = getAuthorWithLeastAnswers(compatibleAuthors, answers);
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
		await db.collection('Answers').add(newAnswer);
		
	} catch(error) {
		logger.error(error);
	}
});
