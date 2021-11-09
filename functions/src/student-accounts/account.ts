import { student_account } from '.';
import { account } from '../accounts';
import { Account, proto } from '@local/common';

account.onCreateHandler.push(async (snapshot, context) => {
  const account = new Account(snapshot.data(), snapshot.data().created_at, snapshot.data().updated_at);

  if (account.type !== proto.main.AccountType.STUDENT) {
    return;
  }

  await student_account.create(new StudentAccount());
});
