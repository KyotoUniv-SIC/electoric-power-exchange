import { NormalAsk, NormalAskHistory, NormalBid, NormalBidHistory, SinglePriceNormalSettlement } from '@local/common';

describe('Normal Contract Test', () => {
  it('Build Single Price Settlement', () => {
    const expectSettlement = new SinglePriceNormalSettlement({ price: 30, amount: 30 });
    const bids = [new NormalBid({ id: 'bid01', account_id: 'test01', price: 30, amount: 40 })];
    const asks = [new NormalAsk({ id: 'ask02', account_id: 'test08', price: 27, amount: 30 })];
    const sortBids = bids.sort((first, second) => second.price - first.price);
    const sortAsks = asks.sort((first, second) => first.price - second.price);

    if (sortBids[0].price < sortAsks[0].price) {
      console.log('UPX成約はありませんでした。');
      expect(true).toBeTruthy;
      return;
    }

    if (!bids.length || !asks.length) {
      const bidHistory = [];
      for (const bid of bids) {
        bidHistory.push(
          new NormalBidHistory({
            account_id: bid.account_id,
            price: bid.price,
            amount: bid.amount,
            is_accepted: false,
          }),
        );
      }
      const askHistory = [];
      for (const ask of asks) {
        askHistory.push(
          new NormalAskHistory({
            account_id: ask.account_id,
            price: ask.price,
            amount: ask.amount,
            is_accepted: false,
          }),
        );
      }
      console.log(bidHistory);
      console.log(askHistory);
      expect(true).toBeTruthy;
      return;
    }

    let sumBidAmount = 0;
    const sumBidAmountHistory = [];
    for (const bid of sortBids) {
      sumBidAmount += bid.amount;
      sumBidAmountHistory.push(sumBidAmount);
    }

    let sumAskAmount = 0;
    const sumAskAmountHistory = [];
    for (const ask of sortAsks) {
      sumAskAmount += ask.amount;
      sumAskAmountHistory.push(sumAskAmount);
    }

    // 階段状の累積受給曲線を歩調を合わせて登ることで均衡価格を発見
    let i = 0;
    let j = 0;
    const condition = true;
    while (condition) {
      if (sortBids[i].price <= sortAsks[j].price) {
        break;
      }
      if (sumBidAmountHistory[i] <= sumAskAmountHistory[j]) {
        if (!sortBids[i + 1]) {
          break;
        }
        i++;
      } else {
        if (!sortAsks[j + 1]) {
          break;
        }
        j++;
      }
    }
    // 止まったときの高い方の価格が均衡価格となる
    const equilibriumPrice = sortBids[i].price <= sortAsks[j].price ? sortAsks[i].price : sortBids[j].price;
    // 止まったときの低い方が成約取引量となる
    const equilibriumAmount = sumBidAmountHistory[i] <= sumAskAmountHistory[j] ? sumBidAmountHistory[i] : sumAskAmountHistory[j];

    const settlement = new SinglePriceNormalSettlement({ price: equilibriumPrice, amount: equilibriumAmount });
    console.log(settlement);
    expect(settlement).toStrictEqual(expectSettlement);
  });
});
