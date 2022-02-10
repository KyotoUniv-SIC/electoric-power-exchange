/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { Message, MessageFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection(chatID: string) {
  return admin
    .firestore()
    .collection(MessageFirestore.collectionPath(chatID))
    .withConverter(MessageFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(MessageFirestore.collectionID)
    .withConverter(MessageFirestore.converter as any);
}

export function document(chatID: string, id?: string) {
  const col = collection(chatID);
  return id ? col.doc(id) : col.doc();
}

export async function get(chatID: string, id: string) {
  return await document(chatID, id)
    .get()
    .then((snapshot) => snapshot.data() as Message);
}

export async function list(chatID: string) {
  return await collection(chatID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as Message));
}

export async function create(data: Message) {
  const doc = document(data.chat_id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

// eslint-disable-next-line camelcase
export async function update(data: Partial<Message> & { id: string } & { chat_id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.chat_id, data.id).update(data);
}

export async function delete_(chatID: string, id: string) {
  await document(chatID, id).delete();
}
