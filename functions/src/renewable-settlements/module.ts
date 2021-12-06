/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { RenewableSettlement, RenewableSettlementFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(RenewableSettlementFirestore.collectionPath())
    .withConverter(RenewableSettlementFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(RenewableSettlementFirestore.collectionID)
    .withConverter(RenewableSettlementFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as RenewableSettlement);
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as RenewableSettlement));
}

export async function create(data: RenewableSettlement) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  const date = now.toDate();
  date.setDate(date.getDate() - 1);
  const timestamp = admin.firestore.Timestamp.fromDate(date);

  data.market_date = timestamp;

  await doc.set(data);
}

export async function update(data: RenewableSettlement) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
