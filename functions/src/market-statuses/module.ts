/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { MarketStatus, MarketStatusFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(MarketStatusFirestore.collectionPath())
    .withConverter(MarketStatusFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(MarketStatusFirestore.collectionID)
    .withConverter(MarketStatusFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as MarketStatus);
}

export async function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return await collection()
    .orderBy('createdAt', 'desc')
    .where('createdAt', '>', today)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as MarketStatus));
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as MarketStatus));
}

export async function create(data: MarketStatus) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: MarketStatus) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
