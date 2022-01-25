/* eslint-disable camelcase */
import { student_account } from '.';
import { room_change } from '../room-changes';

room_change.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()!;
  await student_account.update({ id: data.student_account_id, room_id: data.room_id });
});
