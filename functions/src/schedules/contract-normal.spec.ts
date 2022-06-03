import { NormalAsk, NormalAskHistory, NormalBid, NormalBidHistory, SinglePriceNormalSettlement } from '@local/common';

describe('Normal Contract Test', () => {
  it('Build Single Price Settlement', () => {
    const expectSettlement = new SinglePriceNormalSettlement({ price_ujpy: '30000000', amount_uupx: '30000000' });
    const bids = [new NormalBid({ id: 'bid01', account_id: 'test01', price_ujpy: '30000000', amount_uupx: '40000000' })];
    const asks = [new NormalAsk({ id: 'ask02', account_id: 'test08', price_ujpy: '27000000', amount_uupx: '30000000' })];
    const sortBids = bids.sort((first, second) => parseInt(second.price_ujpy) - parseInt(first.price_ujpy));
    const sortAsks = asks.sort((first, second) => parseInt(first.price_ujpy) - parseInt(second.price_ujpy));

    if (parseInt(sortBids[0].price_ujpy) < parseInt(sortAsks[0].price_ujpy)) {
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
            price_ujpy: bid.price_ujpy,
            amount_uupx: bid.amount_uupx,
            is_accepted: false,
          }),
        );
      }
      const askHistory = [];
      for (const ask of asks) {
        askHistory.push(
          new NormalAskHistory({
            account_id: ask.account_id,
            price_ujpy: ask.price_ujpy,
            amount_uupx: ask.amount_uupx,
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
      sumBidAmount += parseInt(bid.amount_uupx);
      sumBidAmountHistory.push(sumBidAmount);
    }

    let sumAskAmount = 0;
    const sumAskAmountHistory = [];
    for (const ask of sortAsks) {
      sumAskAmount += parseInt(ask.amount_uupx);
      sumAskAmountHistory.push(sumAskAmount);
    }

    // 階段状の累積受給曲線を歩調を合わせて登ることで均衡価格を発見
    let i = 0;
    let j = 0;
    let equilibriumPrice = 0;
    let equilibriumAmount = 0;
    const condition = true;
    while (condition) {
      if (parseInt(sortBids[i].price_ujpy) < parseInt(sortAsks[j].price_ujpy)) {
        break;
      }
      if (sumBidAmountHistory[i] <= sumAskAmountHistory[j]) {
        equilibriumPrice = parseInt(sortAsks[j].price_ujpy);
        equilibriumAmount = sumBidAmountHistory[i];
        if (!sortBids[i + 1]) {
          break;
        }
        i++;
      } else {
        equilibriumPrice = parseInt(sortBids[i].price_ujpy);
        equilibriumAmount = sumAskAmountHistory[j];
        if (!sortAsks[j + 1]) {
          break;
        }
        j++;
      }
    }

    const settlement = new SinglePriceNormalSettlement({
      price_ujpy: equilibriumPrice.toString(),
      amount_uupx: equilibriumAmount.toString(),
    });
    console.log(settlement);
    expect(settlement).toStrictEqual(expectSettlement);
  });
});
