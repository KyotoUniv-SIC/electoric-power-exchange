/* eslint-disable camelcase */
import { account } from './accounts';
import { primary_ask } from './primary-asks';
import { primary_bid } from './primary-bids';
// import { auth } from './auth';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(functions.config().service_account).replace(/\\\\n/g, '\\n'))),
  databaseURL: functions.config().admin.database_url,
});

// export const auth_get_users = auth.getUsers;
// export const auth_remove_user = auth.removeUser;

export const account_on_create = account.onCreate;
export const primary_ask_on_create = primary_ask.onCreate;
export const primary_bid_on_create = primary_bid.onCreate;
