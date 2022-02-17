/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { NormalAskSetting, NormalAskSettingFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(NormalAskSettingFirestore.collectionPath())
    .withConverter(NormalAskSettingFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(NormalAskSettingFirestore.collectionID)
    .withConverter(NormalAskSettingFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as NormalAskSetting);
}

export async function getLatest() {
  return await collection()
    .orderBy('created_at', 'desc')
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalAskSetting)[0]);
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as NormalAskSetting));
}

export async function create(data: NormalAskSetting) {
  const doc = document();
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: Partial<NormalAskSetting> & { id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
