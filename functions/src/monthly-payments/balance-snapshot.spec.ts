import {
  BalanceSnapshot,
  DailyUsage,
  DiscountPrice,
  InsufficientBalance,
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
      amount_uupx: '10000000',
      amount_uspx: '0',
    });
    const insufficiencies = [
      new InsufficientBalance({ id: 'insuff01', student_account_id: 'test01', amount_utoken: '10000000' }),
      new InsufficientBalance({ id: 'insuff01', student_account_id: 'test01', amount_utoken: '5000000' }),
    ].reduce((sum, element) => sum + parseInt(element.amount_utoken), 0);
    const tokens = parseInt(data.amount_uupx) + parseInt(data.amount_uspx) - insufficiencies;
    const primaryBids = [new PrimaryBid({ id: 'primary01', account_id: 'test01', price_ujpy: '27000000', amount_uupx: '120000000' })];
    const primaryAsks = [new PrimaryAsk({ id: 'primary01', account_id: 'test01', price_ujpy: '27000000', amount_uupx: '120000000' })];
    const normalBids = [
      new NormalBidHistory({
        account_id: 'test01',
        price_ujpy: '28000000',
        amount_uupx: '10000000',
        is_accepted: true,
        contract_price_ujpy: '26000000',
      }),
      new NormalBidHistory({
        account_id: 'test01',
        price_ujpy: '16000000',
        amount_uupx: '20000000',
        is_accepted: false,
        contract_price_ujpy: '27000000',
      }),
    ];
    const normalAsks = [
      new NormalAskHistory({
        account_id: 'test01',
        price_ujpy: '16000000',
        amount_uupx: '20000000',
        is_accepted: true,
        contract_price_ujpy: '25700000',
      }),
      new NormalAskHistory({
        account_id: 'test01',
        price_ujpy: '40000000',
        amount_uupx: '30000000',
        is_accepted: false,
        contract_price_ujpy: '27000000',
      }),
    ];
    const renewableBids = [
      new RenewableBidHistory({
        account_id: 'test01',
        price_ujpy: '28000000',
        amount_uspx: '15000000',
        is_accepted: true,
        contract_price_ujpy: '27000000',
      }),
      new RenewableBidHistory({
        account_id: 'test01',
        price_ujpy: '16000000',
        amount_uspx: '20000000',
        is_accepted: false,
        contract_price_ujpy: '28000000',
      }),
    ];
    const renewableAsks = [
      new RenewableAskHistory({
        account_id: 'test01',
        price_ujpy: '16000000',
        amount_uspx: '30000000',
        is_accepted: true,
        contract_price_ujpy: '26000000',
      }),
      new RenewableAskHistory({
        account_id: 'test01',
        price_ujpy: '40000000',
        amount_uspx: '50000000',
        is_accepted: false,
        contract_price_ujpy: '27500000',
      }),
    ];
    // const dailyUsages = [
    //   new DailyUsage({ room_id: 'test01', amount_kwh: '15' }),
    //   new DailyUsage({ room_id: 'test01', amount_kwh: '16' }),
    //   new DailyUsage({ room_id: 'test01', amount_kwh: '17' }),
    //   new DailyUsage({ room_id: 'test01', amount_kwh: '15' }),
    //   new DailyUsage({ room_id: 'test01', amount_kwh: '16' }),
    //   new DailyUsage({ room_id: 'test01', amount_kwh: '17' }),
    // ];
    const discounts = [new DiscountPrice({ price_ujpy: '500000', amount_purchase_utoken: '100000000', amount_sale_utoken: '200000000' })];

    let usage = parseInt(primaryBids[0].amount_uupx) - tokens;
    let payment = parseInt(primaryBids[0].price_ujpy) * parseInt(primaryBids[0].amount_uupx);

    tokens >= 0
      ? (payment -= (parseInt(primaryAsks[0].price_ujpy) - parseInt(discounts[0].price_ujpy)) * tokens)
      : (payment += (parseInt(primaryAsks[0].price_ujpy) + parseInt(discounts[0].price_ujpy)) * tokens);

    for (const normalBid of normalBids) {
      if (normalBid.is_accepted == true) {
        usage += parseInt(normalBid.amount_uupx);
        payment += parseInt(normalBid.contract_price_ujpy) * parseInt(normalBid.amount_uupx);
      }
    }
    for (const normalAsk of normalAsks) {
      if (normalAsk.is_accepted == true) {
        usage -= parseInt(normalAsk.amount_uupx);
        payment -= parseInt(normalAsk.contract_price_ujpy) * parseInt(normalAsk.amount_uupx);
      }
    }
    for (const renewableBid of renewableBids) {
      if (renewableBid.is_accepted == true) {
        usage += parseInt(renewableBid.amount_uspx);
        payment += parseInt(renewableBid.contract_price_ujpy) * parseInt(renewableBid.amount_uspx);
      }
    }
    for (const renewableAsk of renewableAsks) {
      if (renewableAsk.is_accepted == true) {
        usage -= parseInt(renewableAsk.amount_uspx);
        payment -= parseInt(renewableAsk.contract_price_ujpy) * parseInt(renewableAsk.amount_uspx);
      }
    }

    const date = new Date();

    const monthlyPayment = new MonthlyPayment({
      student_account_id: data.student_account_id,
      year: date.getFullYear().toString(),
      month: date.getMonth().toString(),
      amount_ujpy: payment.toString(),
    });
    const monthlyUsage = new MonthlyUsage({
      student_account_id: data.student_account_id,
      year: date.getFullYear().toString(),
      month: date.getMonth().toString(),
      amount_mwh: usage.toString(),
    });

    expect(monthlyUsage.amount_mwh).toBe('196000000');
    expect(monthlyPayment.amount_ujpy).toBe('2473500000');
  });
});
