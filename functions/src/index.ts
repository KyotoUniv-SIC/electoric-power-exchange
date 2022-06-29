/* eslint-disable camelcase */
import './accounts/create-student-account';
import './balance-snapshots/calc-monthly-usage';
import './balances/update-available-balance';
import './chat-deletes/delete-chat';
import './daily-payments/create-balance';
import './message-deletes/delete-message';
import './message-reads/update-message';
import './monthly-usages/create-primary-ask';
import './normal-ask-deletes/delete-normal-ask';
import './normal-asks/update-available-balance';
import './normal-bid-deletes/delete-normal-bid';
import './normal-settlements/create-balance';
import './primary-asks/create-balance';
import './renewable-ask-deletes/delete-renewable-ask';
import './renewable-asks/update-available-balance';
import './renewable-bids/renewable-bid-delete';
import './renewable-settlements/create-balance';
import './room-changes/update-student-account';
import './single-price-normal-settlements/create-normal-settlement';
import './single-price-renewable-settlements/create-renewable-settlement';
import './student-accounts/create-balance';
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
  cost_settings: './cost-settings',
  daily_payment: './daily-payments',
  daily_usages: './daily-usages',
  delta_amounts: './delta-amounts',
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
  // scheduled functions
  contract_normal: './schedules/contract-normal',
  contract_renewable: './schedules/contract-renewable',
  daily_withdraw: './schedules/daily-withdraw',
  monthly_settlement: './schedules/monthly-settlement',
  operation_normal: './schedules/operation-normal',
  operation_renewable: './schedules/operation-renewable',
};

const loadFunctions = (filesObj: any) => {
  for (const key in filesObj) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
      module.exports[key] = require(filesObj[key]);
    }
  }
};

loadFunctions(files);
