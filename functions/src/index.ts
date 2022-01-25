/* eslint-disable camelcase */
import './available-balances/balance';
import './available-balances/normal-ask';
import './available-balances/renewable-ask';
import './balance-snapshots/market-status';
import './balances/normal-settlement';
import './balances/primary';
import './balances/renewable-settlemet';
import './balances/student-account';
import './monthly-payments/calculate-payment';
import './normal-asks/primary';
import './normal-asks/renewable-ask-delete';
import './normal-bids/primary';
import './normal-bids/renewable-bid-delete';
import './normal-settlements/normal-settlement';
import './primary-asks/balance-snapshot';
import './primary-bids/primary';
import './renewable-asks/primary';
import './renewable-asks/renewable-ask-delete';
import './renewable-bids/primary';
import './renewable-bids/renewable-bid-delete';
import './renewable-settlements/renewable-settlement';
import './single-price-normal-settlements/normal-contract';
import './single-price-renewable-settlements/renewable-contract';
import './student-accounts/account';
import * as admin from 'firebase-admin';

// import * as functions from 'firebase-functions';

admin.initializeApp();
// admin.initializeApp({
//   credential: admin.credential.cert(JSON.parse(JSON.stringify(functions.config().service_account).replace(/\\\\n/g, '\\n'))),
//   databaseURL: functions.config().admin.database_url,
// });

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original

// export const auth_get_users = auth.getUsers;
// export const auth_remove_user = auth.removeUser;

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
  normal_ask_deletes: './normal-ask-deletes',
  normal_ask_histories: './normal-ask-histories',
  normal_bids: './normal-bids',
  normal_bid_deletes: './normal-bid-deletes',
  normal_bid_histories: './normal-bid-histories',
  normal_settlements: './normal-settlements',
  primary_asks: './primary-asks',
  primary_bids: './primary-bids',
  renewable_asks: './renewable-asks',
  renewable_ask_deletes: './renewable-ask-deletes',
  renewable_ask_histories: './renewable-ask-histories',
  renewable_bids: './renewable-bids',
  renewable_bid_deletes: './renewable-bid-deletes',
  renewable_bid_histories: './renewable-bid-histories',
  renewable_settlements: './renewable-settlements',
  normals: './single-price-normal-settlements',
  renewables: './single-price-renewable-settlements',
  student_accounts: './student-accounts',
  primary_renewable: './renewable-asks/primary',
  normal_contract: './single-price-normal-settlements/normal-contract',
  renewable_contract: './single-price-renewable-settlements/renewable-contract',
};

const loadFunctions = (filesObj: any) => {
  for (const key in filesObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
      module.exports[key] = require(filesObj[key]);
    }
  }
};

loadFunctions(files);
