/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';

export const collectionPath = 'triggers';

export async function isTriggeredOnce(eventID: string) {
  return await admin.firestore().runTransaction(async (t) => {
    const ref = admin.firestore().collection(collectionPath).doc(eventID);

    const doc = await t.get(ref);
    if (doc.exists) {
      return true;
    }
    t.set(ref, {});
    return false;
  });
}
