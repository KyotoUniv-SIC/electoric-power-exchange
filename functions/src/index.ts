/* eslint-disable camelcase */
import { auth } from './auth';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(functions.config().service_account).replace(/\\\\n/g, '\\n'))),
  databaseURL: functions.config().admin.database_url,
});

export const auth_get_users = auth.getUsers;
export const auth_remove_user = auth.removeUser;
