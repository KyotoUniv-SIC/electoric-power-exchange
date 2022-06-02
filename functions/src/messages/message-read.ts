/* eslint-disable camelcase */
import { message } from '.';
import { message_read } from '../message-reads';
import { MessageRead } from '@local/common';

message_read.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as MessageRead;
  const messageData = await message.get(data.chat_id, data.message_id);

  await message.update({ id: messageData.id, chat_id: messageData.chat_id, is_read: true });
});
