/* eslint-disable camelcase */
import { available_balance } from '.';
import { balance } from '../balances';
import { AvailableBalance } from '@local/common';

module.exports.balanceUpdate = balance.onUpdateHandler.push(async (snapshot, context) => {
  const data = snapshot.after.data()!;

  await available_balance.update(new AvailableBalance(data, data.created_at, data.updated_at));
});

module.exports.balanceCreate = balance.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;

  await available_balance.update(new AvailableBalance(data, data.created_at, data.updated_at));
});
