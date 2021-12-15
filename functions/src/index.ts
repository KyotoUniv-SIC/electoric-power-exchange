/* eslint-disable camelcase */
// import { account } from './accounts';
// import { balance } from './balances';
// import { normal_ask } from './normal-asks';
// import { normal_bid } from './normal-bids';
// import { primary_ask } from './primary-asks';
// import { primary_bid } from './primary-bids';
import * as admin from 'firebase-admin';

admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original

// export const auth_get_users = auth.getUsers;
// export const auth_remove_user = auth.removeUser;
// export const account_on_create = account.onCreate;
// export const primary_ask_on_create = primary_ask.onCreate;
// export const primary_bid_on_create = primary_bid.onCreate;
// export const normal_ask_on_create = normal_ask.onCreate;
// export const normal_bid_on_create = normal_bid.onCreate;
// export const balance_on_create = balance.onCreate;
// export const balance_on_update = balance.onUpdate;

const files = {
  availableBalanceUpdate: './available-balances/balance',
  balanceSnapShot: './balance-snapshots/primary',
};

const loadFunctions = (filesObj: any) => {
  for (const key in filesObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
      module.exports[key] = require(filesObj[key]);
    }
  }
};

loadFunctions(files);
