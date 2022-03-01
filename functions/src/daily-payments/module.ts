/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';
import { DailyPayment, DailyPaymentFirestore } from '@local/common';

export * from './controller'

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

export async function create(
  data: DailyPayment
) {
  const doc = document(data.student_account_iddata.id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(
  data: Partial<DailyPayment> & { id: string }
) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.student_account_id, data.id).update(data);
}

export async function delete_(studentAccountID: string, id: string) {
  await document(studentAccountID, id).delete();
}
