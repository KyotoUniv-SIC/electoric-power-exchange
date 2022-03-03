/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { NormalBidHistory, NormalBidHistoryFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(NormalBidHistoryFirestore.collectionPath())
    .withConverter(NormalBidHistoryFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(NormalBidHistoryFirestore.collectionID)
    .withConverter(NormalBidHistoryFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as NormalBidHistory);
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalBidHistory));
}

export async function listLastMonth(studentAccountID: string) {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  return await collection()
    .orderBy('created_at', 'desc')
    .where('account_id', '==', studentAccountID)
    .where('created_at', '<', now)
    .where('created_at', '>', lastMonth)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalBidHistory));
}

export async function create(data: NormalBidHistory) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: Partial<NormalBidHistory> & { id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
