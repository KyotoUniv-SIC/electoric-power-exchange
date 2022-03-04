/* eslint-disable camelcase */
import './available-balances/balance';
import './available-balances/normal-ask';
import './available-balances/renewable-ask';
import './balance-snapshots/monthly-settlement';
import './balances/daily-usage';
import './balances/normal-settlement';
import './balances/primary';
import './balances/renewable-settlement';
import './balances/student-account';
import './chats/chat-delete';
import './messages/message-delete';
import './messages/message-read';
import './monthly-payments/balance-snapshot';
import './normal-asks/normal-ask-delete';
import './normal-bids/normal-bid-delete';
import './normal-settlements/normal-settlement';
import './primary-asks/monthly-usage';
import './primary-bids/primary';
import './renewable-asks/renewable-ask-delete';
// import './renewable-asks/primary';
import './renewable-bids/renewable-bid-delete';
import './renewable-settlements/renewable-settlement';
// import './single-price-normal-settlements/normal-contract';
// import './single-price-renewable-settlements/renewable-contract';
import './student-accounts/account';
import './student-accounts/room-change';
import './student-accounts/xrpl';
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
  account_privates: './account-privates',
  accounts: './accounts',
  admin_accounts: './admin-accounts',
  admin_privates: './admin-privates',
  available_balances: './available-balances',
  balance_snapshots: './balance-snapshots',
  balances: './balances',
  chat_deletes: './chat-deletes',
  chats: './chats',
  daily_usages: './daily-usages',
  discount_prices: './discount-prices',
  insufficient_balances: './insufficient-balances',
  market_statuses: './market-statuses',
  message_deletes: './message-deletes',
  message_reads: './message-reads',
  messages: './messages',
  monthly_payments: './monthly-payments',
  monthly_usages: './monthly-usages',
  normal_ask_deletes: './normal-ask-deletes',
  normal_ask_histories: './normal-ask-histories',
  normal_ask_settings: './normal-ask-settings',
  normal_asks: './normal-asks',
  normal_bid_deletes: './normal-bid-deletes',
  normal_bid_histories: './normal-bid-histories',
  normal_bids: './normal-bids',
  normal_settlements: './normal-settlements',
  primary_asks: './primary-asks',
  primary_bids: './primary-bids',
  renewable_ask_deletes: './renewable-ask-deletes',
  renewable_ask_histories: './renewable-ask-histories',
  renewable_ask_settings: './renewable-ask-settings',
  renewable_asks: './renewable-asks',
  renewable_bid_deletes: './renewable-bid-deletes',
  renewable_bid_histories: './renewable-bid-histories',
  renewable_bids: './renewable-bids',
  renewable_settlements: './renewable-settlements',
  room_changes: './room-changes',
  normals: './single-price-normal-settlements',
  renewables: './single-price-renewable-settlements',
  student_accounts: './student-accounts',
  primary_normal: './normal-asks/primaryAdditional',
  primary_renewable: './renewable-asks/primary',
  normal_contract: './single-price-normal-settlements/normal-contract',
  renewable_contract: './single-price-renewable-settlements/renewable-contract',
  monthly_settlement: './balance-snapshots/monthly-settlement',
};

const loadFunctions = (filesObj: any) => {
  for (const key in filesObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
      module.exports[key] = require(filesObj[key]);
    }
  }
};

loadFunctions(files);
