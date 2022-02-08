/* eslint-disable camelcase */
import { chat } from '.';
import { chat_delete } from '../chat-deletes';

chat_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  const chatData = await chat.get(data.chat_id);

  await chat.update({ id: chatData.id, is_deleted: true });
});
