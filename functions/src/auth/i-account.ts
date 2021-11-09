/* eslint-disable camelcase */
import * as admin from 'firebase-admin';

export type IAccount = {
  id: string;
  user_ids: string[];
  admin_user_ids: string[];
  image_url: string;
  created_at: admin.firestore.Timestamp;
  updated_at: admin.firestore.Timestamp;
};
