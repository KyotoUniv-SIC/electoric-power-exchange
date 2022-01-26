/* eslint-disable camelcase */
import { normal_ask } from '.';
import { normal_ask_delete } from '../normal-ask-deletes';

normal_ask_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const ask = await normal_ask.get(data.ask_id);

  await normal_ask.update({ id: ask.id, is_deleted: true });
});
