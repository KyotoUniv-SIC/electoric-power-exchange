/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { RenewableRewardSetting, RenewableRewardSettingFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection() {
  return admin
    .firestore()
    .collection(RenewableRewardSettingFirestore.collectionPath())
    .withConverter(RenewableRewardSettingFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(RenewableRewardSettingFirestore.collectionID)
    .withConverter(RenewableRewardSettingFirestore.converter as any);
}

export function document(id?: string) {
  const col = collection();
  return id ? col.doc(id) : col.doc();
}

export async function get(id: string) {
  return await document(id)
    .get()
    .then((snapshot) => snapshot.data() as RenewableRewardSetting | undefined);
}

export async function getLatest() {
  return await collection()
    .orderBy('created_at', 'desc')
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as RenewableRewardSetting)[0]);
}

export async function list() {
  return await collection()
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as RenewableRewardSetting));
}

export async function listLatest() {
  return await collection()
    .orderBy('created_at', 'desc')
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as RenewableRewardSetting));
}

export async function create(data: RenewableRewardSetting) {
  const doc = document(data.id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: Partial<RenewableRewardSetting> & { id: string }) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.id).update(data);
}

export async function delete_(id: string) {
  await document(id).delete();
}
