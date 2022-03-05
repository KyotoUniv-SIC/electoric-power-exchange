/* eslint-disable camelcase */
import { normal_ask } from '.';
import { admin_account } from '../admin-accounts';
import { balance } from '../balances';
import { insufficient_balance } from '../insufficient-balances';
import { normal_ask_setting } from '../normal-ask-settings';
import { student_account } from '../student-accounts';
import { NormalAsk, NormalAskSetting, proto } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.primaryNormalAsk = f.pubsub
  .schedule('0 12 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const now = new Date();
    const setting = await normal_ask_setting.getLatest();
    const adminAccount = await admin_account.getByName('admin');
    const students = await student_account.list();
    if (now.getDate() == 1) {
      await normal_ask_setting.create(new NormalAskSetting({ price: 27 }));
      return;
    }
    if (!setting) {
      // const amountUPX = 0;
      let amountInsufficient = 0;
      for (const student of students) {
        // amountUPX += (await balance.list(student.id))[0].amount_upx;
        for (const insufficient of await insufficient_balance.listThisMonth(student.id)) {
          amountInsufficient += insufficient.amount;
        }
        const tokenBalance = await balance.list(student.id);
        amountInsufficient -= tokenBalance[0].amount_upx + tokenBalance[0].amount_spx;
      }
      // if (amountUPX < amountInsufficient) {
      //   await normal_ask.create(
      //     new NormalAsk({
      //       type: proto.main.NormalAskType.SECONDARY,
      //       account_id: adminAccount[0].id,
      //       price: 27,
      //       amount: amountInsufficient - amountUPX,
      //       is_deleted: false,
      //     }),
      //   );
      // }
      if (amountInsufficient) {
        await normal_ask.create(
          new NormalAsk({
            type: proto.main.NormalAskType.PRIMARYADDITIONAL,
            account_id: adminAccount[0].id,
            price: 27,
            amount: amountInsufficient,
            is_deleted: false,
          }),
        );
      }
    } else if (!setting.amount) {
      // let amountUPX = 0;
      let amountInsufficient = 0;
      for (const student of students) {
        // amountUPX += (await balance.list(student.id))[0].amount_upx;
        for (const insufficient of await insufficient_balance.list(student.id)) {
          amountInsufficient += insufficient.amount;
        }
      }
      // if (amountUPX < amountInsufficient) {
      //   await normal_ask.create(
      //     new NormalAsk({
      //       type: proto.main.NormalAskType.SECONDARY,
      //       account_id: adminAccount[0].id,
      //       price: setting.price,
      //       amount: amountInsufficient - amountUPX,
      //       is_deleted: false,
      //     }),
      //   );
      // }
      if (amountInsufficient) {
        await normal_ask.create(
          new NormalAsk({
            type: proto.main.NormalAskType.PRIMARYADDITIONAL,
            account_id: adminAccount[0].id,
            price: setting.price,
            amount: amountInsufficient,
            is_deleted: false,
          }),
        );
      }
    } else {
      await normal_ask.create(
        new NormalAsk({
          type: proto.main.NormalAskType.SECONDARY,
          account_id: adminAccount[0].id,
          price: setting.price,
          amount: setting.amount,
          is_deleted: false,
        }),
      );
    }
    await normal_ask_setting.create(new NormalAskSetting({ price: !setting ? 27.1 : setting.price + 0.1 }));
  });
