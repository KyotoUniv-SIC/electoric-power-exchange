import { NormalAsk, NormalAskHistory, NormalBidHistory, SinglePriceNormalSettlement } from '@local/common';

describe('Normal Contract Test', () => {
  it('Build Single Price Settlement', () => {
    const expectSettlement = new SinglePriceNormalSettlement({ price: 25, amount: 85 });
    const bids: any[] = [];
    const asks = [
      new NormalAsk({ id: 'ask01', account_id: 'test07', price: 32, amount: 40 }),
      new NormalAsk({ id: 'ask02', account_id: 'test08', price: 27, amount: 30 }),
      new NormalAsk({ id: 'ask03', account_id: 'test09', price: 25, amount: 25 }),
      new NormalAsk({ id: 'ask04', account_id: 'test10', price: 28, amount: 90 }),
      new NormalAsk({ id: 'ask05', account_id: 'test11', price: 20, amount: 10 }),
      new NormalAsk({ id: 'ask06', account_id: 'test12', price: 12, amount: 50 }),
    ];
    const sortBids = bids.sort((first, second) => second.price - first.price);
    const sortAsks = asks.sort((first, second) => first.price - second.price);

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
        i++;
      } else {
        j++;
      }
    }
    // 止まったときの高い方の価格が均衡価格となる
    const equilibriumPrice = sortBids[i].price <= sortAsks[j].price ? sortAsks[i].price : sortBids[j].price;
    // 止まったときの低い方が成約取引量となる
    const equilibriumAmount = sumBidAmountHistory[i] <= sumAskAmountHistory[j] ? sumBidAmountHistory[i] : sumAskAmountHistory[j];
    expect(true).toBeTruthy;

    const settlement = new SinglePriceNormalSettlement({ price: equilibriumPrice, amount: equilibriumAmount });
    expect(settlement).toStrictEqual(expectSettlement);
  });
});
