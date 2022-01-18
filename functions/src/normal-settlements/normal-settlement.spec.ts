import {
  NormalAsk,
  NormalAskHistory,
  NormalBid,
  NormalBidHistory,
  NormalSettlement,
  proto,
  SinglePriceNormalSettlement,
} from '@local/common';

describe('Normal Contract Test', () => {
  it('Build Settlement', () => {
    const data = new SinglePriceNormalSettlement({ price: 25, amount: 85 });
    const bids = [
      new NormalBid({ id: 'bid01', account_id: 'test01', price: 15, amount: 40 }),
      new NormalBid({ id: 'bid02', account_id: 'test02', price: 24, amount: 20 }),
      new NormalBid({ id: 'bid03', account_id: 'test03', price: 27, amount: 15 }),
      new NormalBid({ id: 'bid04', account_id: 'test04', price: 20, amount: 100 }),
      new NormalBid({ id: 'bid05', account_id: 'test05', price: 28, amount: 25 }),
      new NormalBid({ id: 'bid06', account_id: 'test06', price: 25, amount: 50 }),
    ];
    const asks = [
      new NormalAsk({ id: 'ask01', account_id: 'test07', price: 32, amount: 40 }),
      new NormalAsk({ id: 'ask02', account_id: 'test08', price: 27, amount: 30 }),
      new NormalAsk({ id: 'ask03', account_id: 'test09', price: 25, amount: 25 }),
      new NormalAsk({ id: 'ask04', account_id: 'test10', price: 28, amount: 90 }),
      new NormalAsk({ id: 'ask05', account_id: 'test11', price: 20, amount: 10 }),
      new NormalAsk({ id: 'ask06', account_id: 'test12', price: 12, amount: 50 }),
    ];
    const sortNormalBids = bids.sort((first, second) => second.price - first.price);
    const sortNormalAsks = asks.sort((first, second) => first.price - second.price);

    let i = 0;
    let j = 0;
    const bidHistory = [];
    const askHistory = [];
    const normalSettlement = [];
    const condition = true;
    while (condition) {
      if (sortNormalBids[i].price < data.price || sortNormalAsks[j].price > data.price) {
        for (; i < sortNormalBids.length - 1; i++) {
          bidHistory.push(
            new NormalBidHistory({
              account_id: sortNormalBids[i].account_id,
              price: sortNormalBids[i].price,
              amount: sortNormalBids[i].amount,
              is_accepted: false,
              contract_price: data.price,
            }),
          );
        }

        for (; j < sortNormalAsks.length - 1; j++) {
          askHistory.push(
            new NormalAskHistory({
              type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
              account_id: sortNormalAsks[j].account_id,
              price: sortNormalAsks[j].price,
              amount: sortNormalAsks[j].amount,
              is_accepted: false,
              contract_price: data.price,
            }),
          );
        }
        break;
      }

      if (sortNormalBids[i].amount < sortNormalAsks[j].amount) {
        normalSettlement.push(
          new NormalSettlement({
            bid_id: sortNormalBids[i].account_id,
            ask_id: sortNormalAsks[j].account_id,
            price: data.price,
            amount: sortNormalBids[i].amount,
          }),
        );

        bidHistory.push(
          new NormalBidHistory({
            account_id: sortNormalBids[i].account_id,
            price: sortNormalBids[i].price,
            amount: sortNormalBids[i].amount,
            is_accepted: true,
            contract_price: data.price,
          }),
        );

        askHistory.push(
          new NormalAskHistory({
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price: sortNormalAsks[j].price,
            amount: sortNormalBids[i].amount,
            is_accepted: true,
            contract_price: data.price,
          }),
        );

        sortNormalAsks[j].amount -= sortNormalBids[i].amount;
        i++;
        if (i >= sortNormalBids.length) {
          break;
        }
      } else if (sortNormalBids[i].amount > sortNormalAsks[j].amount) {
        normalSettlement.push(
          new NormalSettlement({
            bid_id: sortNormalBids[i].account_id,
            ask_id: sortNormalAsks[j].account_id,
            price: data.price,
            amount: sortNormalAsks[j].amount,
          }),
        );

        bidHistory.push(
          new NormalBidHistory({
            account_id: sortNormalBids[i].account_id,
            price: sortNormalBids[i].price,
            amount: sortNormalAsks[j].amount,
            is_accepted: true,
            contract_price: data.price,
          }),
        );

        askHistory.push(
          new NormalAskHistory({
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price: sortNormalAsks[j].price,
            amount: sortNormalAsks[j].amount,
            is_accepted: true,
            contract_price: data.price,
          }),
        );

        sortNormalBids[i].amount -= sortNormalAsks[j].amount;
        j++;
        if (j >= sortNormalAsks.length) {
          break;
        }
      } else {
        normalSettlement.push(
          new NormalSettlement({
            bid_id: sortNormalBids[i].account_id,
            ask_id: sortNormalAsks[j].account_id,
            price: data.price,
            amount: sortNormalBids[i].amount,
          }),
        );

        bidHistory.push(
          new NormalBidHistory({
            account_id: sortNormalBids[i].account_id,
            price: sortNormalBids[i].price,
            amount: sortNormalBids[i].amount,
            is_accepted: true,
            contract_price: data.price,
          }),
        );

        askHistory.push(
          new NormalAskHistory({
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price: sortNormalAsks[j].price,
            amount: sortNormalBids[i].amount,
            is_accepted: true,
            contract_price: data.price,
          }),
        );

        i++;
        j++;
        if (i >= sortNormalBids.length || j >= sortNormalAsks.length) {
          break;
        }
      }
    }
    console.log(bidHistory);
    console.log(askHistory);
    console.log(normalSettlement);
    expect(bidHistory.filter((bid) => bid.is_accepted == true).length).toBe(normalSettlement.length);
    expect(askHistory.filter((ask) => ask.is_accepted == true).length).toBe(normalSettlement.length);
  });
});
