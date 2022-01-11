import { FirestoreCreateHandler, FirestoreDeleteHandler, FirestoreUpdateHandler } from '../triggers';
import { isTriggeredOnce } from '../triggers/module';
import { StudentAccountFirestore } from '@local/common';
import * as functions from 'firebase-functions';

export const onCreateHandler: FirestoreCreateHandler[] = [];
export const onUpdateHandler: FirestoreUpdateHandler[] = [];
export const onDeleteHandler: FirestoreDeleteHandler[] = [];

module.exports.onCreate = functions.firestore.document(StudentAccountFirestore.virtualPath).onCreate(async (snapshot, context) => {
  if (await isTriggeredOnce(context.eventId)) {
    return;
  }

  for (const handler of onCreateHandler) {
    try {
      await handler(snapshot, context);
    } catch (e) {
      console.error(e);
    }
  }
});

module.exports.onUpdate = functions.firestore.document(StudentAccountFirestore.virtualPath).onUpdate(async (snapshot, context) => {
  if (await isTriggeredOnce(context.eventId)) {
    return;
  }

  for (const handler of onUpdateHandler) {
    try {
      await handler(snapshot, context);
    } catch (e) {
      console.error(e);
    }
  }
});

module.exports.onDelete = functions.firestore.document(StudentAccountFirestore.virtualPath).onDelete(async (snapshot, context) => {
  if (await isTriggeredOnce(context.eventId)) {
    return;
  }

  for (const handler of onDeleteHandler) {
    try {
      await handler(snapshot, context);
    } catch (e) {
      console.error(e);
    }
  }
});
