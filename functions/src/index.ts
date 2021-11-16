/* eslint-disable camelcase */
import * as json from '../.runtimeconfig.json';
import { account } from './accounts';
// import { auth } from './auth';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

console.log('hoge');
console.log('config', json);

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(json.service_account).replace(/\\\\n/g, '\\n'))),
  databaseURL: functions.config().admin.database_url,
});

// export const auth_get_users = auth.getUsers;
// export const auth_remove_user = auth.removeUser;

export const account_on_create = account.onCreate;
