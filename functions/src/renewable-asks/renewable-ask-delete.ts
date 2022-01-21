/* eslint-disable camelcase */
import { renewable_ask } from '.';
import { renewable_ask_delete } from '../renewable-ask-deletes';

renewable_ask_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const ask = await renewable_ask.get(data.ask_id);

  await renewable_ask.update({ id: ask.id, is_deleted: true });
});
