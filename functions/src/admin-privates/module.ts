/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { AdminPrivate, AdminPrivateFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection(adminAccountID: string) {
  return admin
    .firestore()
    .collection(AdminPrivateFirestore.collectionPath(adminAccountID))
    .withConverter(AdminPrivateFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(AdminPrivateFirestore.collectionID)
    .withConverter(AdminPrivateFirestore.converter as any);
}

export function document(adminAccountID: string, id?: string) {
  const col = collection(adminAccountID);
  return id ? col.doc(id) : col.doc();
}

export async function get(adminAccountID: string, id: string) {
  return await document(adminAccountID, id)
    .get()
    .then((snapshot) => snapshot.data() as AdminPrivate);
}

export async function list(adminAccountID: string) {
  return await collection(adminAccountID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as AdminPrivate));
}

export async function create(data: AdminPrivate) {
  const doc = document(data.admin_account_id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(
  // eslint-disable-next-line camelcase
  data: Partial<AdminPrivate> & { id: string } & { admin_account_id: string },
) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.admin_account_id, data.id).update(data);
}

export async function delete_(adminAccountID: string, id: string) {
  await document(adminAccountID, id).delete();
}
