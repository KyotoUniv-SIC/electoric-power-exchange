/* eslint-disable camelcase */
import { normal_ask } from '.';
import { admin_account } from '../admin-accounts';
import { delta_amount } from '../delta-amounts';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_bid_history } from '../normal-bid-histories';
import { normal_bid } from '../normal-bids';
import { single_price_normal_settlement } from '../single-price-normal-settlements';
import { DeltaAmount, NormalAsk, proto } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.primaryNormalAsk = f.pubsub
  .schedule('0 12 * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const threshold = 2;
    const adminAccount = await admin_account.getByName('admin');
    const contracts = await single_price_normal_settlement.listDescDate();
    const deltaPrice = contracts[0].price - contracts[1].price;
    const price = 27;

    const todayAsks = await normal_ask_history.getToday();
    const todayAsksAmount = todayAsks.reduce((prev, current) => prev + current.amount, 0);
    const yesterdayAsks = await normal_ask_history.getYesterday();
    const yesterdayAsksAmount = yesterdayAsks.reduce((prev, current) => prev + current.amount, 0);
    const deltaAsksAmount = todayAsksAmount - yesterdayAsksAmount;

    const todayBids = await normal_bid_history.getToday();
    const todayBidsAmount = todayBids.reduce((prev, current) => prev + current.amount, 0);
    const yesterdayBids = await normal_bid_history.getYesterday();
    const yesterdayBidsAmount = yesterdayBids.reduce((prev, current) => prev + current.amount, 0);
    const deltaBidsAmount = todayBidsAmount - yesterdayBidsAmount;

    // 2→3→4→1の順番で場合分けして処理
    if (Math.abs(deltaPrice) <= threshold) {
      console.log('No Market Operation');
      await delta_amount.create(
        new DeltaAmount({
          asks_amount: deltaAsksAmount.toString(),
          bids_amount: deltaBidsAmount.toString(),
        }),
      );
    } else {
      const deltaAmounts = await delta_amount.list();
      const aveAsksDeltaAmount = deltaAmounts.reduce((prev, current) => prev + Number(current.asks_amount), 0) / deltaAmounts.length;
      const aveBidsDeltaAmount = deltaAmounts.reduce((prev, current) => prev + Number(current.bids_amount), 0) / deltaAmounts.length;
      if (deltaPrice > 0) {
        if (aveAsksDeltaAmount - deltaAsksAmount > deltaBidsAmount - aveBidsDeltaAmount) {
          // 供給(売り)減→価格上昇
          // 供給(売り)増→価格低下, 基準電力価格で売り注文を入れる。
          if (aveAsksDeltaAmount - deltaAsksAmount >0) {
            await normal_ask.create(
              new NormalAsk({
                type: proto.main.NormalAskType.PRIMARYADDITIONAL,
                account_id: adminAccount[0].id,
                price,
                amount: aveAsksDeltaAmount - deltaAsksAmount,
                is_deleted: false,
              }),
            );
          }
        } else {
          // 需要(買い)増→価格上昇
          // 供給 売り増→価格低下, 基準電力価格で売り注文を入れる 。
          if (deltaBidsAmount - aveBidsDeltaAmount > 0) {
            await normal_ask.create(
              new NormalAsk({
                type: proto.main.NormalAskType.PRIMARYADDITIONAL,
                account_id: adminAccount[0].id,
                price,
                amount: deltaBidsAmount - aveBidsDeltaAmount,
                is_deleted: false,
              }),
            );
          }
        }
      } else {
        if (aveBidsDeltaAmount - deltaBidsAmount > deltaAsksAmount - aveAsksDeltaAmount) {
          // 需要(買い) 減→価格低下
          // 需要(買い)増 →価格上昇基準電力価格で買い注文を入れる。
          if (aveBidsDeltaAmount - deltaBidsAmount > 0) {
            await normal_bid.create(
              new NormalAsk({
                type: proto.main.NormalAskType.PRIMARYADDITIONAL,
                account_id: adminAccount[0].id,
                price,
                amount: aveBidsDeltaAmount - deltaBidsAmount,
                is_deleted: false,
              }),
            );
          }
        } else {
          // 供給 売り増→価格低下
          // 需要 買い増→価格上昇,基準電力価格で買い注文を入れる。
          if (deltaAsksAmount - aveAsksDeltaAmount > 0) {
            await normal_bid.create(
              new NormalAsk({
                type: proto.main.NormalAskType.PRIMARYADDITIONAL,
                account_id: adminAccount[0].id,
                price,
                amount: deltaAsksAmount - aveAsksDeltaAmount,
                is_deleted: false,
              }),
            );
          }
        }
      }
    }
  });
