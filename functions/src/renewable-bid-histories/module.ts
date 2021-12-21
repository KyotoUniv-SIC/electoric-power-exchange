/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { RenewableBidHistory, RenewableBidHistoryFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(RenewableBidHistoryFirestore.collectionPath())
    .withConverter(RenewableBidHistoryFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(RenewableBidHistoryFirestore.collectionID)
    .withConverter(RenewableBidHistoryFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as RenewableBidHistory);
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as RenewableBidHistory));
}

export async function listLastMonth(studentAccountID: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() + 1);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setHours(0, 0, 0, 0);

  return await collection()
    .orderBy('createdAt', 'desc')
    .where('account_id', '==', studentAccountID)
    .where('createdAt', '<', today)
    .where('createdAt', '>', lastMonth)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as RenewableBidHistory));
}

export async function create(data: RenewableBidHistory) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: RenewableBidHistory) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
