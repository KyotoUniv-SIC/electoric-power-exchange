/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { MonthlyUsage, MonthlyUsageFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection(studentAccountID: string) {
  return admin
    .firestore()
    .collection(MonthlyUsageFirestore.collectionPath(studentAccountID))
    .withConverter(MonthlyUsageFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(MonthlyUsageFirestore.collectionID)
    .withConverter(MonthlyUsageFirestore.converter as any);
}

export function document(studentAccountID: string, id?: string) {
  const col = collection(studentAccountID);
  return id ? col.doc(id) : col.doc();
}

export async function get(studentAccountID: string, id: string) {
  return await document(studentAccountID, id)
    .get()
    .then((snapshot) => snapshot.data() as MonthlyUsage);
}

export async function list(studentAccountID: string) {
  return await collection(studentAccountID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as MonthlyUsage));
}

export async function getLastYear(studentAccountID: string, date: Date) {
  const lastYear1dayAgo = date.setFullYear(date.getFullYear() - 1, date.getMonth() + 1, date.getDate() - 1);
  const lastYear1dayLater = date.setFullYear(date.getFullYear() - 1, date.getMonth() + 1, date.getDate() + 1);
  return await collection(studentAccountID)
    .where('created_at', '>', lastYear1dayAgo)
    .where('created_at', '<', lastYear1dayLater)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as MonthlyUsage));
}

export async function create(data: MonthlyUsage) {
  const doc = document(data.student_account_id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: MonthlyUsage) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.student_account_id, data.id).update(data);
}

export async function delete_(studentAccountID: string, id: string) {
  await document(studentAccountID, id).delete();
}
