import {
  BalanceSnapshot,
  DailyUsage,
  DiscountPrice,
  MonthlyPayment,
  MonthlyUsage,
  NormalAskHistory,
  NormalBidHistory,
  PrimaryAsk,
  PrimaryBid,
  RenewableAskHistory,
  RenewableBidHistory,
} from '@local/common';

describe('Calculated Payment Test', () => {
  it('Calculate payment', () => {
    const data = new BalanceSnapshot({
      id: 'balance01',
      student_account_id: 'test01',
      amount_upx: 10,
      amount_spx: 0,
    });
    const tokens = data.amount_upx + data.amount_spx;
    const primaryBids = [new PrimaryBid({ id: 'primary01', account_id: 'test01', price: 27, amount: 120 })];
    const primaryAsks = [new PrimaryAsk({ id: 'primary01', account_id: 'test01', price: 27, amount: 120 })];
    const normalBids = [
      new NormalBidHistory({ account_id: 'test01', price: 28, amount: 10, is_accepted: true, contract_price: 26 }),
      new NormalBidHistory({ account_id: 'test01', price: 16, amount: 20, is_accepted: false, contract_price: 27 }),
    ];
    const normalAsks = [
      new NormalAskHistory({ account_id: 'test01', price: 16, amount: 20, is_accepted: true, contract_price: 25.7 }),
      new NormalAskHistory({ account_id: 'test01', price: 40, amount: 30, is_accepted: false, contract_price: 27 }),
    ];
    const renewableBids = [
      new RenewableBidHistory({ account_id: 'test01', price: 28, amount: 15, is_accepted: true, contract_price: 27 }),
      new RenewableBidHistory({ account_id: 'test01', price: 16, amount: 20, is_accepted: false, contract_price: 28 }),
    ];
    const renewableAsks = [
      new RenewableAskHistory({ account_id: 'test01', price: 16, amount: 30, is_accepted: true, contract_price: 26 }),
      new RenewableAskHistory({ account_id: 'test01', price: 40, amount: 50, is_accepted: false, contract_price: 27.5 }),
    ];
    const dailyUsages = [
      new DailyUsage({ room_id: 'test01', amount_kwh: 15 }),
      new DailyUsage({ room_id: 'test01', amount_kwh: 16 }),
      new DailyUsage({ room_id: 'test01', amount_kwh: 17 }),
      new DailyUsage({ room_id: 'test01', amount_kwh: 15 }),
      new DailyUsage({ room_id: 'test01', amount_kwh: 16 }),
      new DailyUsage({ room_id: 'test01', amount_kwh: 17 }),
    ];
    const discounts = [new DiscountPrice({ price: 0.5, amount_purchase: 100, amount_sale: 200 })];

    let usage = primaryBids[0].amount - tokens;
    let payment = primaryBids[0].price * primaryBids[0].amount;

    tokens >= 0
      ? (payment -= (primaryAsks[0].price - discounts[0].price) * tokens)
      : (payment += (primaryAsks[0].price + discounts[0].price) * tokens);

    for (const normalBid of normalBids) {
      if (normalBid.is_accepted == true) {
        usage += normalBid.amount;
        payment += normalBid.contract_price * normalBid.amount;
      }
    }
    for (const normalAsk of normalAsks) {
      if (normalAsk.is_accepted == true) {
        usage -= normalAsk.amount;
        payment -= normalAsk.contract_price * normalAsk.amount;
      }
    }
    for (const renewableBid of renewableBids) {
      if (renewableBid.is_accepted == true) {
        usage += renewableBid.amount;
        payment += renewableBid.contract_price * renewableBid.amount;
      }
    }
    for (const renewableAsk of renewableAsks) {
      if (renewableAsk.is_accepted == true) {
        usage -= renewableAsk.amount;
        payment -= renewableAsk.contract_price * renewableAsk.amount;
      }
    }
    for (const dailyUsage of dailyUsages) {
      usage += dailyUsage.amount_kwh;
    }
    const date = new Date();

    const monthlyPayment = new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear(),
      month: date.getMonth(),
      amount_jpy: payment,
    });
    const monthlyUsage = new MonthlyUsage({
      student_account_id: data.student_account_id,
      year: date.getFullYear(),
      month: date.getMonth(),
      amount_kwh: usage,
    });

    expect(monthlyUsage.amount_kwh).toBe(181);
    expect(monthlyPayment.amount_jpy).toBe(2346);
  });
});
