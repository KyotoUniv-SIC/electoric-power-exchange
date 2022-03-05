/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { PrimaryAsk, PrimaryAskFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(PrimaryAskFirestore.collectionPath())
    .withConverter(PrimaryAskFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(PrimaryAskFirestore.collectionID)
    .withConverter(PrimaryAskFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as PrimaryAsk);
}

export async function listLastMonth() {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  return await collection()
    .orderBy('created_at', 'desc')
    .where('created_at', '<', now)
    .where('created_at', '>', lastMonth)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as PrimaryAsk));
}

export async function listLastMonthByID(accountID: string) {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  return await collection()
    .orderBy('created_at', 'desc')
    .where('created_at', '<', now)
    .where('created_at', '>', lastMonth)
    .where('account_id', '==', accountID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as PrimaryAsk));
}

export async function create(data: PrimaryAsk) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: Partial<PrimaryAsk> & { id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
