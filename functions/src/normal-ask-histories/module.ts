/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { NormalAskHistory, NormalAskHistoryFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(NormalAskHistoryFirestore.collectionPath())
    .withConverter(NormalAskHistoryFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(NormalAskHistoryFirestore.collectionID)
    .withConverter(NormalAskHistoryFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as NormalAskHistory);
}

export async function getToday() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return await collection()
    .where('created_at', '<', today)
    .where('created_at', '>', yesterday)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalAskHistory));
}

export async function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dayBeforeYesterday = new Date();
  dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
  return await collection()
    .where('created_at', '<', yesterday)
    .where('created_at', '>', dayBeforeYesterday)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalAskHistory));
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalAskHistory));
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
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalAskHistory));
}

export async function create(data: NormalAskHistory) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: Partial<NormalAskHistory> & { id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
