import { FirestoreCreateHandler, FirestoreDeleteHandler, FirestoreUpdateHandler } from '../triggers';
import { isTriggeredOnce } from '../triggers/module';
import { RenewableRewardSettingFirestore } from '@local/common';
import * as functions from 'firebase-functions';

export const onCreateHandler: FirestoreCreateHandler[] = [];
export const onUpdateHandler: FirestoreUpdateHandler[] = [];
export const onDeleteHandler: FirestoreDeleteHandler[] = [];

export const onCreate = functions.firestore.document(RenewableRewardSettingFirestore.virtualPath).onCreate(async (snapshot, context) => {
  if (await isTriggeredOnce(context.eventId)) {
    return;
  }

  for (const handler of onCreateHandler) {
    try {
      await handler(snapshot, context);
    } catch (e) {
      console.error(`Error: in function ${handler.name}`);
      console.error(e);
    }
  }
});

export const onUpdate = functions.firestore.document(RenewableRewardSettingFirestore.virtualPath).onUpdate(async (snapshot, context) => {
  if (await isTriggeredOnce(context.eventId)) {
    return;
  }

  for (const handler of onUpdateHandler) {
    try {
      await handler(snapshot, context);
    } catch (e) {
      console.error(`Error: in function ${handler.name}`);
      console.error(e);
    }
  }
});

export const onDelete = functions.firestore.document(RenewableRewardSettingFirestore.virtualPath).onDelete(async (snapshot, context) => {
  if (await isTriggeredOnce(context.eventId)) {
    return;
  }

  for (const handler of onDeleteHandler) {
    try {
      await handler(snapshot, context);
    } catch (e) {
      console.error(`Error: in function ${handler.name}`);
      console.error(e);
    }
  }
});
