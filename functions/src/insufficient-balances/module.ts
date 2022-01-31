/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { InsufficientBalance, InsufficientBalanceFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection(studentAccountID: string) {
  return admin
    .firestore()
    .collection(InsufficientBalanceFirestore.collectionPath(studentAccountID))
    .withConverter(InsufficientBalanceFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(InsufficientBalanceFirestore.collectionID)
    .withConverter(InsufficientBalanceFirestore.converter as any);
}

export function document(studentAccountID: string, id?: string) {
  const col = collection(studentAccountID);
  return id ? col.doc(id) : col.doc();
}

export async function get(studentAccountID: string, id: string) {
  return await document(studentAccountID, id)
    .get()
    .then((snapshot) => snapshot.data() as InsufficientBalance);
}

export async function list(studentAccountID: string) {
  return await collection(studentAccountID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as InsufficientBalance));
}

export async function listLastMonth(studentAccountID: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() + 1);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setHours(0, 0, 0, 0);

  return await collection(studentAccountID)
    .orderBy('created_at', 'desc')
    .where('created_at', '<', today)
    .where('created_at', '>', lastMonth)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as InsufficientBalance));
}

export async function create(data: InsufficientBalance) {
  const doc = document(data.student_account_id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

// eslint-disable-next-line camelcase
export async function update(data: Partial<InsufficientBalance> & { id: string } & { student_account_id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.student_account_id, data.id).update(data);
}

export async function delete_(studentAccountID: string, id: string) {
  await document(studentAccountID, id).delete();
}
