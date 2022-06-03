import {
  NormalAsk,
  NormalAskHistory,
  NormalBid,
  NormalBidHistory,
  NormalSettlement,
  proto,
  SinglePriceNormalSettlement,
} from '@local/common';

describe('Normal Settlement Test', () => {
  it('Build Transaction Settlement', () => {
    const data = new SinglePriceNormalSettlement({ price_ujpy: '25000000', amount_uupx: '85000000' });
    const bids = [
      new NormalBid({ id: 'bid01', account_id: 'test01', price_ujpy: '15000000', amount_uupx: '40000000' }),
      new NormalBid({ id: 'bid02', account_id: 'test02', price_ujpy: '24000000', amount_uupx: '20000000' }),
      new NormalBid({ id: 'bid03', account_id: 'test03', price_ujpy: '27000000', amount_uupx: '15000000' }),
      new NormalBid({ id: 'bid04', account_id: 'test04', price_ujpy: '20000000', amount_uupx: '100000000' }),
      new NormalBid({ id: 'bid05', account_id: 'test05', price_ujpy: '28000000', amount_uupx: '25000000' }),
      new NormalBid({ id: 'bid06', account_id: 'test06', price_ujpy: '25000000', amount_uupx: '50000000' }),
    ];
    const asks = [
      new NormalAsk({ id: 'ask01', account_id: 'test07', price_ujpy: '32000000', amount_uupx: '40000000' }),
      new NormalAsk({ id: 'ask02', account_id: 'test08', price_ujpy: '27000000', amount_uupx: '30000000' }),
      new NormalAsk({ id: 'ask03', account_id: 'test09', price_ujpy: '25000000', amount_uupx: '25000000' }),
      new NormalAsk({ id: 'ask04', account_id: 'test10', price_ujpy: '28000000', amount_uupx: '90000000' }),
      new NormalAsk({ id: 'ask05', account_id: 'test11', price_ujpy: '20000000', amount_uupx: '10000000' }),
      new NormalAsk({ id: 'ask06', account_id: 'test12', price_ujpy: '12000000', amount_uupx: '50000000' }),
    ];
    const sortNormalBids = bids.sort((first, second) => parseInt(second.price_ujpy) - parseInt(first.price_ujpy));
    const sortNormalAsks = asks.sort((first, second) => parseInt(first.price_ujpy) - parseInt(second.price_ujpy));

    let i = 0;
    let j = 0;
    const bidHistory = [];
    const askHistory = [];
    const normalSettlement = [];
    const condition = true;
    while (condition) {
      if (
        parseInt(sortNormalBids[i].price_ujpy) < parseInt(data.price_ujpy) ||
        parseInt(sortNormalAsks[j].price_ujpy) > parseInt(data.price_ujpy)
      ) {
        for (; i < sortNormalBids.length; i++) {
          bidHistory.push(
            new NormalBidHistory({
              account_id: sortNormalBids[i].account_id,
              price_ujpy: sortNormalBids[i].price_ujpy,
              amount_uupx: sortNormalBids[i].amount_uupx,
              is_accepted: false,
              contract_price_ujpy: data.price_ujpy,
            }),
          );
        }

        for (; j < sortNormalAsks.length; j++) {
          askHistory.push(
            new NormalAskHistory({
              type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
              account_id: sortNormalAsks[j].account_id,
              price_ujpy: sortNormalAsks[j].price_ujpy,
              amount_uupx: sortNormalAsks[j].amount_uupx,
              is_accepted: false,
              contract_price_ujpy: data.price_ujpy,
            }),
          );
        }
        break;
      }

      if (parseInt(sortNormalBids[i].amount_uupx) < parseInt(sortNormalAsks[j].amount_uupx)) {
        normalSettlement.push(
          new NormalSettlement({
            bid_id: sortNormalBids[i].account_id,
            ask_id: sortNormalAsks[j].account_id,
            price_ujpy: data.price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
          }),
        );

        bidHistory.push(
          new NormalBidHistory({
            account_id: sortNormalBids[i].account_id,
            price_ujpy: sortNormalBids[i].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          }),
        );

        askHistory.push(
          new NormalAskHistory({
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price_ujpy: sortNormalAsks[j].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          }),
        );

        sortNormalAsks[j].amount_uupx = (parseInt(sortNormalAsks[j].amount_uupx) - parseInt(sortNormalBids[i].amount_uupx)).toString();
        i++;
        if (i >= sortNormalBids.length) {
          break;
        }
      } else if (parseInt(sortNormalBids[i].amount_uupx) > parseInt(sortNormalAsks[j].amount_uupx)) {
        normalSettlement.push(
          new NormalSettlement({
            bid_id: sortNormalBids[i].account_id,
            ask_id: sortNormalAsks[j].account_id,
            price_ujpy: data.price_ujpy,
            amount_uupx: sortNormalAsks[j].amount_uupx,
          }),
        );

        bidHistory.push(
          new NormalBidHistory({
            account_id: sortNormalBids[i].account_id,
            price_ujpy: sortNormalBids[i].price_ujpy,
            amount_uupx: sortNormalAsks[j].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          }),
        );

        askHistory.push(
          new NormalAskHistory({
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price_ujpy: sortNormalAsks[j].price_ujpy,
            amount_uupx: sortNormalAsks[j].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          }),
        );

        sortNormalBids[i].amount_uupx = (parseInt(sortNormalBids[i].amount_uupx) - parseInt(sortNormalAsks[j].amount_uupx)).toString();
        j++;
        if (j >= sortNormalAsks.length) {
          break;
        }
      } else {
        normalSettlement.push(
          new NormalSettlement({
            bid_id: sortNormalBids[i].account_id,
            ask_id: sortNormalAsks[j].account_id,
            price_ujpy: data.price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
          }),
        );

        bidHistory.push(
          new NormalBidHistory({
            account_id: sortNormalBids[i].account_id,
            price_ujpy: sortNormalBids[i].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
          }),
        );

        askHistory.push(
          new NormalAskHistory({
            type: sortNormalAsks[j].type as unknown as proto.main.NormalAskHistoryType,
            account_id: sortNormalAsks[j].account_id,
            price_ujpy: sortNormalAsks[j].price_ujpy,
            amount_uupx: sortNormalBids[i].amount_uupx,
            is_accepted: true,
            contract_price_ujpy: data.price_ujpy,
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
