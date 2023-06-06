import functions = require('firebase-functions');
import { UserCustomInfo, Group } from '../../Modules/Interfaces/UserCustomInfo';
import { Timestamp, getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

export const onNewUserSignUp = functions.auth.user().onCreate(async (user) => {
  try {
    const newUser: UserCustomInfo = {
      fullName: (user.displayName ?? 'Brez imena'),
      academicTitle: "",
      email: (user.email ?? 'Neznano'),
      group: Group.Unconfirmed,
      lawFields: [],
      inactive: {
        from: Timestamp.now(),
        to: Timestamp.now()
      },
      uid: user.uid,
    };
    
    await db.collection('Users').doc(user.uid).set(newUser);
  } catch (error) {
    console.error(error);
  }
});
