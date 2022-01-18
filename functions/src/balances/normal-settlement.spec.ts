import { Balance, NormalSettlement } from '@local/common';

describe('Change Balance by Settlement', () => {
  it('Build Settlement', () => {
    const balances = [
      new Balance({
        id: 'balance01',
        student_account_id: 'test05',
        amount_upx: 100,
        amount_spx: 100,
      }),
      new Balance({
        id: 'balance02',
        student_account_id: 'test12',
        amount_upx: 200,
        amount_spx: 200,
      }),
    ];
    const expectedBalances = [
      new Balance({
        id: 'balance01',
        student_account_id: 'test05',
        amount_upx: 125,
        amount_spx: 100,
      }),
      new Balance({
        id: 'balance02',
        student_account_id: 'test12',
        amount_upx: 175,
        amount_spx: 200,
      }),
    ];
    const data = new NormalSettlement({
      bid_id: 'test05',
      ask_id: 'test12',
      price: 25,
      amount: 25,
    });
    const newBalance = [];

    const bidderBalance = balances.filter((balance) => balance.student_account_id == data.bid_id);
    newBalance.push(
      new Balance({
        id: bidderBalance[0].id,
        student_account_id: data.bid_id,
        amount_upx: bidderBalance[0].amount_upx + data.amount,
        amount_spx: bidderBalance[0].amount_spx,
      }),
    );

    const sellerBalance = balances.filter((balance) => balance.student_account_id == data.ask_id);
    newBalance.push(
      new Balance({
        id: sellerBalance[0].id,
        student_account_id: data.ask_id,
        amount_upx: sellerBalance[0].amount_upx - data.amount,
        amount_spx: sellerBalance[0].amount_spx,
      }),
    );
    console.log(newBalance);

    expect(newBalance).toStrictEqual(expectedBalances);
  });
});
