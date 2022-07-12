/* eslint-disable camelcase */
import { account_private } from '../account-privates';
import { normal_ask } from '../normal-asks';
import { normal_bid } from '../normal-bids';
import { renewable_ask } from '../renewable-asks';
import { renewable_bid } from '../renewable-bids';
import { student_account } from '../student-accounts';
import axios from 'axios';
import * as functions from 'firebase-functions';
import * as qs from 'qs';

const f = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, memory: '2GB', secrets: ['SEND_MAIL'] });
module.exports.operationRenewable = f.pubsub
  .schedule('0 21 * * *')
  // .schedule('5,35 * * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const students = await student_account.list();
    const normalBids = await normal_bid.listValid();
    const normalAsks = await normal_ask.listValid();
    const renewableBids = await renewable_bid.listValid();
    const renewableAsks = await renewable_ask.listValid();
    const noOrderStudents = students
      .filter((stundent) => !normalBids.find((bid) => bid.account_id == stundent.id))
      .filter((stundent) => !normalAsks.find((ask) => ask.account_id == stundent.id))
      .filter((stundent) => !renewableBids.find((bid) => bid.account_id == stundent.id))
      .filter((stundent) => !renewableAsks.find((ask) => ask.account_id == stundent.id));

    for (const student of noOrderStudents) {
      const accountPrivs = await account_private.listLatest(student.id);
      const accountPriv = accountPrivs.find((priv) => priv.email);
      if (!accountPriv) {
        console.log(student.id, 'no email address');
      } else {
        const email = accountPriv.email;
        const subject = '【EDISON】本日の注文がまだされておりません';
        const body = `${student.name}様
      ${student.name}様は、EDISONでの本日の注文をまだ行っておりません。
      明日の午前9時までの注文をお願いいたします。

      以下のページ Orderにて注文状況をご確認いただけます。
      https://edison-dev-1c1b5.web.app/txs

      京都大学EDISONチーム`;
        const api = process.env.SEND_MAIL;
        if (api) {
          await axios.post(
            api,
            qs.stringify({
              email,
              subject,
              body,
            }),
          );
        } else {
          console.log('Mail API is not set');
        }
      }
    }
  });
