/* eslint-disable camelcase */
import { room_change } from '.';
import { student_account } from '../student-accounts';
import { RoomChange } from '@local/common';

room_change.onCreateHandler.push(async (snapshot, context) => {
  const data = snapshot.data()! as RoomChange;
  await student_account.update({ id: data.student_account_id, room_id: data.room_id_after });
  // if (!data.room_id_before) {
  //   await student_account.update({ id: data.student_account_id, room_id: data.room_id_after });
  // } else {
  //   console.error(data.student_account_id, 'change room request detected');
  // }
});
