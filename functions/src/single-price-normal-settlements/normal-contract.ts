/* eslint-disable camelcase */
import { single_price_normal_settlement } from '.';
import { market_status } from '../market-statuses';
import { normal_ask_history } from '../normal-ask-histories';
import { normal_ask } from '../normal-asks';
import { normal_bid_history } from '../normal-bid-histories';
import { normal_bid } from '../normal-bids';
import { MarketStatus, NormalAskHistory, NormalBidHistory, SinglePriceNormalSettlement } from '@local/common';
import * as functions from 'firebase-functions';

const f = functions.region('asia-northeast1');
module.exports.normalContract = f.pubsub
  .schedule('0 0 * * *')
  // .schedule('every 10 minutes')
  .timeZone('Asia/Tokyo') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const normalBids = await normal_bid.listValid();
    const normalAsks = await normal_ask.listValid();
    const marketStatus = await market_status.getToday();
    // bidかaskが0の場合は0成約で終了する
    if (!normalBids.length || !normalAsks.length) {
      console.log('bid,askの不足でUPX成約は0です。');
      if (!marketStatus.length) {
        await market_status.create(new MarketStatus({ is_finished_normal: true, is_finished_renewable: false }));
      } else {
        await market_status.update({ id: marketStatus[0].id, is_finished_normal: true });
      }
      console.log(marketStatus);

      for (const bid of normalBids) {
        await normal_bid_history.create(
          new NormalBidHistory({
            account_id: bid.account_id,
            price: bid.price,
            amount: bid.amount,
            is_accepted: false,
          }),
        );
        await normal_bid.delete_(bid.id);
      }

      for (const ask of normalAsks) {
        await normal_ask_history.create(
          new NormalAskHistory({
            account_id: ask.account_id,
            price: ask.price,
            amount: ask.amount,
            is_accepted: false,
          }),
        );
        await normal_ask.delete_(ask.id);
      }
      return;
    }

    // Bidを価格の高い順に並び替える
    const sortNormalBids = normalBids.sort((first, second) => second.price - first.price);

    // Askを価格の低い順に並び替える
    const sortNormalAsks = normalAsks.sort((first, second) => first.price - second.price);

    // 最高値のBidが最安値のAskより低い場合0成約で終了
    if (sortNormalBids[0].price < sortNormalAsks[0].price) {
      console.log('UPX成約はありませんでした。');
      if (!marketStatus.length) {
        await market_status.create(new MarketStatus({ is_finished_normal: true, is_finished_renewable: false }));
      } else {
        await market_status.update({ id: marketStatus[0].id, is_finished_normal: true });
      }
      console.log(marketStatus);

      for (const bid of sortNormalBids) {
        await normal_bid_history.create(
          new NormalBidHistory({
            account_id: bid.account_id,
            price: bid.price,
            amount: bid.amount,
            is_accepted: false,
          }),
        );
        await normal_bid.delete_(bid.id);
      }

      for (const ask of sortNormalAsks) {
        await normal_ask_history.create(
          new NormalAskHistory({
            account_id: ask.account_id,
            price: ask.price,
            amount: ask.amount,
            is_accepted: false,
          }),
        );
        await normal_ask.delete_(ask.id);
      }
      return;
    }

    // Bidの量の推移を配列にする
    let sumBidAmount = 0;
    const sumBidAmountHistory = [];
    for (const bid of sortNormalBids) {
      sumBidAmount += bid.amount;
      sumBidAmountHistory.push(sumBidAmount);
    }

    // Askの量の推移を配列にする
    let sumAskAmount = 0;
    const sumAskAmountHistory = [];
    for (const ask of sortNormalAsks) {
      sumAskAmount += ask.amount;
      sumAskAmountHistory.push(sumAskAmount);
    }

    // 階段状の累積受給曲線を歩調を合わせて登ることで均衡価格を発見
    let i = 0;
    let j = 0;
    const condition = true;
    while (condition) {
      if (sortNormalBids[i].price <= sortNormalAsks[j].price) {
        break;
      }
      if (sumBidAmountHistory[i] <= sumAskAmountHistory[j]) {
        if (!sortNormalBids[i + 1]) {
          break;
        }
        i++;
      } else {
        if (!sortNormalAsks[j + 1]) {
          break;
        }
        j++;
      }
    }

    // 止まったときの低い方の価格が均衡価格となる
    const equilibriumPrice = sortNormalBids[i].price <= sortNormalAsks[j].price ? sortNormalBids[i].price : sortNormalAsks[j].price;
    // 止まったときの低い方が成約取引量となる
    const equilibriumAmount = sumBidAmountHistory[i] <= sumAskAmountHistory[j] ? sumBidAmountHistory[i] : sumAskAmountHistory[j];

    await single_price_normal_settlement.create(
      new SinglePriceNormalSettlement({
        price: equilibriumPrice,
        amount: equilibriumAmount,
      }),
    );
  });
