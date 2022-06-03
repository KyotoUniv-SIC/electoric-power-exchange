/* eslint-disable camelcase */
import { renewable_ask_delete } from '.';
import { renewable_ask } from '../renewable-asks';
import { RenewableAskDelete } from '@local/common';

renewable_ask_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as RenewableAskDelete;
  const ask = await renewable_ask.get(data.ask_id);

  await renewable_ask.update({ id: ask.id, is_deleted: true });
});
