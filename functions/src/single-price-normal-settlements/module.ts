/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';
import { SinglePriceNormalSettlement, SinglePriceNormalSettlementFirestore } from '@local/common';

export * from './controller'

export function collection() {
  return admin
    .firestore()
    .collection(SinglePriceNormalSettlementFirestore.collectionPath())
    .withConverter(SinglePriceNormalSettlementFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(SinglePriceNormalSettlementFirestore.collectionID)
    .withConverter(SinglePriceNormalSettlementFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as SinglePriceNormalSettlement);
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as SinglePriceNormalSettlement));
}

export async function create(
  data: SinglePriceNormalSettlement
) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(
  data: SinglePriceNormalSettlement
) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
