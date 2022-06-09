/* eslint-disable camelcase */
import { chat_delete } from '.';
import { chat } from '../chats';
import { ChatDelete } from '@local/common';

chat_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as ChatDelete;
  const chatData = await chat.get(data.chat_id);

  await chat.update({ id: chatData.id, is_deleted: true });
});
