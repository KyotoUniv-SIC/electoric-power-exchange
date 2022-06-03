/* eslint-disable camelcase */
import { normal_ask_delete } from '.';
import { normal_ask } from '../normal-asks';
import { NormalAskDelete } from '@local/common';

normal_ask_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as NormalAskDelete;
  const ask = await normal_ask.get(data.ask_id);

  await normal_ask.update({ id: ask.id, is_deleted: true });
});
