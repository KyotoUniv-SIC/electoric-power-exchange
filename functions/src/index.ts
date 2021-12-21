/* eslint-disable camelcase */
import * as admin from 'firebase-admin';

// import * as functions from 'firebase-functions';

admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original

// export const auth_get_users = auth.getUsers;
// export const auth_remove_user = auth.removeUser;
// export const account_on_create = account.onCreate;

const files = {
  accounts: './accounts',
  admin_accounts: './admin-accounts',
  available_balances: './available-balances',
  balance_snapshots: './balance-snapshots',
  balances: './balances',
  daily_usages: './daily-usages',
  discount_prices: './discount-prices',
  market_statuses: './market-statuses',
  monthly_payments: './monthly-payments',
  monthly_usages: './monthly-usages',
  normal_asks: './normal-asks',
  normal_ask_histories: './normal-ask-histories',
  normal_bids: './normal-bids',
  normal_bid_histories: './normal-bid-histories',
  normal_settlements: './normal-settlements',
  primary_asks: './primary-asks',
  primary_bids: './primary-bids',
  renewable_asks: './renewable-asks',
  renewable_ask_histories: './renewable-ask-histories',
  renewable_bids: './renewable-bids',
  renewable_bid_histories: './renewable-bid-histories',
  renewable_settlements: './renewable-settlements',
  normals: './single-price-normal-settlements',
  renewables: './single-price-renewable-settlements',
  student_accounts: './student-accounts',
};

const loadFunctions = (filesObj: any) => {
  for (const key in filesObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
      module.exports[key] = require(filesObj[key]);
    }
  }
};

loadFunctions(files);
