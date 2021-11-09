import * as functions from 'firebase-functions';

export type FirestoreCreateHandler = (snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) => Promise<void>;

export type FirestoreUpdateHandler = (
  snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>,
  context: functions.EventContext,
) => Promise<void>;

export type FirestoreDeleteHandler = (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext,
) => Promise<void>;
