/* eslint-disable camelcase */
import * as admin from 'firebase-admin';

export type IUser = {
  current_account_id: string;
  account_ids_order: string[];
  created_at: admin.firestore.Timestamp;
  updated_at: admin.firestore.Timestamp;
  is_admin?: boolean;
};
