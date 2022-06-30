/* eslint-disable camelcase */
import { admin_account } from '../admin-accounts';
import { delta_amount } from '../delta-amounts';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_ask_setting } from '../normal-ask-settings';
import { normal_ask } from '../normal-asks';
import { normal_bid_history } from '../normal-bid-histories';
import { normal_bid } from '../normal-bids';
import { single_price_normal_settlement } from '../single-price-normal-settlements';
import { DeltaAmount, NormalAsk, NormalAskSetting, NormalBid, proto } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1').runWith({ timeoutSeconds: 540, memory: '2GB' });
module.exports.operationNormal = f.pubsub
  // .schedule('0 10 * * *')
  .schedule('5,35 * * * *')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    // しきい値
    const threshold = 2000000;
    // 価格の決定
    const setting = await normal_ask_setting.getLatest();
    const now = new Date();
    const price = !setting || now.getDate() == 1 ? 27000000 : parseInt(setting.price_ujpy);
    const ratio = setting.ratio_percentage ? parseInt(setting.ratio_percentage) : 100;
    const enable = setting.enable ? setting.enable : false;

    await normal_ask_setting.create(
      new NormalAskSetting({ price_ujpy: (price + 100000).toString(), ratio_percentage: ratio.toString(), enable: enable }),
    );

    const adminAccount = await admin_account.getByName('admin');
    const contracts = await single_price_normal_settlement.listDescDate();
    const deltaPrice = parseInt(contracts[0].price_ujpy) - parseInt(contracts[1].price_ujpy);

    const todayAsks = await normal_ask_history.getToday();
    const todayAsksAmount = todayAsks.reduce((prev, current) => prev + parseInt(current.amount_uupx), 0);
    const yesterdayAsks = await normal_ask_history.getYesterday();
    const yesterdayAsksAmount = yesterdayAsks.reduce((prev, current) => prev + parseInt(current.amount_uupx), 0);
    const deltaAsksAmount = todayAsksAmount - yesterdayAsksAmount;

    const todayBids = await normal_bid_history.getToday();
    const todayBidsAmount = todayBids.reduce((prev, current) => prev + parseInt(current.amount_uupx), 0);
    const yesterdayBids = await normal_bid_history.getYesterday();
    const yesterdayBidsAmount = yesterdayBids.reduce((prev, current) => prev + parseInt(current.amount_uupx), 0);
    const deltaBidsAmount = todayBidsAmount - yesterdayBidsAmount;

    // 2→3→4→1の順番で場合分けして処理
    if (Math.abs(deltaPrice) <= threshold || !enable) {
      console.log('No Market Operation & create delta-amount');
      await delta_amount.create(
        new DeltaAmount({
          asks_amount_utoken: Math.floor(deltaAsksAmount).toString(),
          bids_amount_utoken: Math.floor(deltaBidsAmount).toString(),
        }),
      );
    } else {
      console.log('Run Normal Market Operation');
      const deltaAmounts = await delta_amount.list();
      if (!deltaAmounts.length) {
        console.log('No deltaAmount data.');
        return;
      }
      const aveAsksDeltaAmount =
        deltaAmounts.reduce((prev, current) => prev + parseInt(current.asks_amount_utoken), 0) / deltaAmounts.length;
      const aveBidsDeltaAmount =
        deltaAmounts.reduce((prev, current) => prev + parseInt(current.bids_amount_utoken), 0) / deltaAmounts.length;
      if (deltaPrice > 0) {
        if (aveAsksDeltaAmount - deltaAsksAmount > deltaBidsAmount - aveBidsDeltaAmount) {
          console.log('supply shortage');
          // 供給(売り)減→価格上昇
          // 供給(売り)増→価格低下, 基準電力価格で売り注文を入れる。
          if (aveAsksDeltaAmount - deltaAsksAmount > 0) {
            await normal_ask.create(
              new NormalAsk({
                type: proto.main.NormalAskType.PRIMARYADDITIONAL,
                account_id: adminAccount[0].id,
                price_ujpy: price.toString(),
                amount_uupx: Math.floor(((aveAsksDeltaAmount - deltaAsksAmount) * ratio) / 100).toString(),
                is_deleted: false,
              }),
            );
          }
        } else {
          console.log('excessive demand');
          // 需要(買い)増→価格上昇
          // 供給 売り増→価格低下, 基準電力価格で売り注文を入れる 。
          if (deltaBidsAmount - aveBidsDeltaAmount > 0) {
            await normal_ask.create(
              new NormalAsk({
                type: proto.main.NormalAskType.PRIMARYADDITIONAL,
                account_id: adminAccount[0].id,
                price_ujpy: price.toString(),
                amount_uupx: Math.floor(((deltaBidsAmount - aveBidsDeltaAmount) * ratio) / 100).toString(),
                is_deleted: false,
              }),
            );
          }
        }
      } else {
        if (aveBidsDeltaAmount - deltaBidsAmount > deltaAsksAmount - aveAsksDeltaAmount) {
          console.log('demand shortage');
          // 需要(買い) 減→価格低下
          // 需要(買い)増 →価格上昇基準電力価格で買い注文を入れる。
          if (aveBidsDeltaAmount - deltaBidsAmount > 0) {
            await normal_bid.create(
              new NormalBid({
                account_id: adminAccount[0].id,
                price_ujpy: price.toString(),
                amount_uupx: Math.floor(((aveBidsDeltaAmount - deltaBidsAmount) * ratio) / 100).toString(),
                is_deleted: false,
              }),
            );
          }
        } else {
          console.log('excessive supply');
          // 供給 売り増→価格低下
          // 需要 買い増→価格上昇,基準電力価格で買い注文を入れる。
          if (deltaAsksAmount - aveAsksDeltaAmount > 0) {
            await normal_bid.create(
              new NormalBid({
                account_id: adminAccount[0].id,
                price_ujpy: price.toString(),
                amount_uupx: Math.floor(((deltaAsksAmount - aveAsksDeltaAmount) * ratio) / 100).toString(),
                is_deleted: false,
              }),
            );
          }
        }
      }
    }
  });
