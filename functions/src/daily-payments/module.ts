/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { DailyPayment, DailyPaymentFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection(studentAccountID: string) {
  return admin
    .firestore()
    .collection(DailyPaymentFirestore.collectionPath(studentAccountID))
    .withConverter(DailyPaymentFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(DailyPaymentFirestore.collectionID)
    .withConverter(DailyPaymentFirestore.converter as any);
}

export function document(studentAccountID: string, id?: string) {
  const col = collection(studentAccountID);
  return id ? col.doc(id) : col.doc();
}

export async function get(studentAccountID: string, id: string) {
  return await document(studentAccountID, id)
    .get()
    .then((snapshot) => snapshot.data() as DailyPayment | undefined);
}

export async function list(studentAccountID: string) {
  return await collection(studentAccountID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as DailyPayment));
}

export async function listToday(studentAccountID: string) {
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return await collection(studentAccountID)
    .orderBy('created_at', 'desc')
    .where('created_at', '<', now)
    .where('created_at', '>', yesterday)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as DailyPayment));
}

export async function listLastMonth(studentAccountID: string) {
  const first = new Date();
  first.setMonth(first.getMonth() - 1);
  first.setDate(1);
  first.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setDate(1);
  end.setHours(0, 0, 0, 0);

  return await collection(studentAccountID)
    .orderBy('created_at', 'desc')
    .where('created_at', '>', first)
    .where('created_at', '<', end)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as DailyPayment));
}

export async function listThisMonth(studentAccountID: string) {
  const now = new Date();
  const first = new Date();
  first.setDate(1);
  first.setHours(0, 0, 0, 0);

  return await collection(studentAccountID)
    .orderBy('created_at', 'desc')
    .where('created_at', '<', now)
    .where('created_at', '>', first)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as DailyPayment));
}

export async function create(data: DailyPayment) {
  const doc = document(data.student_account_id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

// eslint-disable-next-line camelcase
export async function update(data: Partial<DailyPayment> & { id: string } & { student_account_id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.student_account_id, data.id).update(data);
}

export async function delete_(studentAccountID: string, id: string) {
  await document(studentAccountID, id).delete();
}
