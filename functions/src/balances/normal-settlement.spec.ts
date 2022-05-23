import { Balance, NormalSettlement } from '@local/common';

describe('Balance Normal Settlement Test', () => {
  it('Change Balance by Settlement', () => {
    const balances = [
      new Balance({
        id: 'balance01',
        student_account_id: 'test05',
        amount_uupx: '100000000',
        amount_uspx: '100000000',
      }),
      new Balance({
        id: 'balance02',
        student_account_id: 'test12',
        amount_uupx: '200000000',
        amount_uspx: '200000000',
      }),
    ];
    const expectedBalances = [
      new Balance({
        id: 'balance01',
        student_account_id: 'test05',
        amount_uupx: '125000000',
        amount_uspx: '100000000',
      }),
      new Balance({
        id: 'balance02',
        student_account_id: 'test12',
        amount_uupx: '175000000',
        amount_uspx: '200000000',
      }),
    ];
    const data = new NormalSettlement({
      bid_id: 'test05',
      ask_id: 'test12',
      price_ujpy: '25000000',
      amount_uupx: '25000000',
    });
    const newBalance = [];

    const bidderBalance = balances.filter((balance) => balance.student_account_id == data.bid_id);
    newBalance.push(
      new Balance({
        id: bidderBalance[0].id,
        student_account_id: data.bid_id,
        amount_uupx: (parseInt(bidderBalance[0].amount_uupx) + parseInt(data.amount_uupx)).toString(),
        amount_uspx: bidderBalance[0].amount_uspx,
      }),
    );

    const sellerBalance = balances.filter((balance) => balance.student_account_id == data.ask_id);
    newBalance.push(
      new Balance({
        id: sellerBalance[0].id,
        student_account_id: data.ask_id,
        amount_uupx: (parseInt(sellerBalance[0].amount_uupx) - parseInt(data.amount_uupx)).toString(),
        amount_uspx: sellerBalance[0].amount_uspx,
      }),
    );
    console.log(newBalance);

    expect(newBalance).toStrictEqual(expectedBalances);
  });
});
