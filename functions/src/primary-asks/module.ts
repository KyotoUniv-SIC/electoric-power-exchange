/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import * as admin from 'firebase-admin';
import { PrimaryAsk, PrimaryAskFirestore } from '@local/common';

export * from './controller'

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

export async function create(
  data: PrimaryAsk
) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(
  data: PrimaryAsk
) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
