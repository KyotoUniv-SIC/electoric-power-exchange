/* eslint-disable camelcase */
import { message } from '.';
import { message_delete } from '../message-deletes';
import { MessageDelete } from '@local/common';

message_delete.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as MessageDelete;
  const messageData = await message.get(data.chat_id, data.message_id);

  await message.update({ id: messageData.id, chat_id: messageData.chat_id, is_deleted: true });
});
