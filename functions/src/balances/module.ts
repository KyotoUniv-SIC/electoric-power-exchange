/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable require-jsdoc */
import { Balance, BalanceFirestore } from '@local/common';
import * as admin from 'firebase-admin';

export * from './controller';

export function collection(studentAccountID: string) {
  return admin
    .firestore()
    .collection(BalanceFirestore.collectionPath(studentAccountID))
    .withConverter(BalanceFirestore.converter as any);
}

export function collectionGroup() {
  return admin
    .firestore()
    .collectionGroup(BalanceFirestore.collectionID)
    .withConverter(BalanceFirestore.converter as any);
}

export function document(studentAccountID: string, id?: string) {
  const col = collection(studentAccountID);
  return id ? col.doc(id) : col.doc();
}

export async function get(studentAccountID: string, id: string) {
  return await document(studentAccountID, id)
    .get()
    .then((snapshot) => snapshot.data() as Balance);
}

export async function getLatest(studentAccountID: string) {
  return await collection(studentAccountID)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as Balance));
}

// 先にPrimaryAskが走って残高更新されてしまう場合にも対応する昨月の残高管理
export async function getLastMonth(studentAccountID: string) {
  const today = new Date().setHours(0, 0, 0, 0);
  return await collection(studentAccountID)
    .orderBy('createdAt', 'desc')
    .where('createdAt', '<', today)
    .limit(1)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as Balance));
}

export async function list(studentAccountID: string) {
  return await collection(studentAccountID)
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data() as Balance));
}

export async function create(data: Balance) {
  const doc = document(data.student_account_id);
  data.id = doc.id;

  const now = admin.firestore.Timestamp.now();
  data.created_at = now;
  data.updated_at = now;

  await doc.set(data);
}

export async function update(data: Balance) {
  const now = admin.firestore.Timestamp.now();
  data.updated_at = now;

  await document(data.student_account_id, data.id).update(data);
}

export async function delete_(studentAccountID: string, id: string) {
  await document(studentAccountID, id).delete();
}
