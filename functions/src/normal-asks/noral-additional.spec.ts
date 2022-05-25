/* eslint-disable camelcase */

describe('operation test', () => {
  it('operation', () => {
    const threshold = 2;
    const deltaPrice = 3;

    const todayAsksAmount = 30;
    const yesterdayAsksAmount = 31;
    const deltaAsksAmount = todayAsksAmount - yesterdayAsksAmount;

    const todayBidsAmount = 20;
    const yesterdayBidsAmount = 28;
    const deltaBidsAmount = todayBidsAmount - yesterdayBidsAmount;

    if (Math.abs(deltaPrice) <= threshold) {
      console.log('No Market Operation');
    } else {
      const aveAsksDeltaAmount = 2.0;
      const aveBidsDeltaAmount = 2.5;
      if (deltaPrice > 0) {
        if (aveAsksDeltaAmount - deltaAsksAmount > deltaBidsAmount - aveBidsDeltaAmount) {
          // 供給(売り)減→価格上昇
          // 供給(売り)増→価格低下, 基準電力価格で売り注文を入れる。
          if (aveAsksDeltaAmount - deltaAsksAmount > 0) {
            console.log('p>0,Sが大きい');
          }
        } else {
          // 需要(買い)増→価格上昇
          // 供給 売り増→価格低下, 基準電力価格で売り注文を入れる 。
          if (deltaBidsAmount - aveBidsDeltaAmount > 0) {
            console.log('p>0,Bが大きい');
          }
        }
      } else {
        if (aveBidsDeltaAmount - deltaBidsAmount > deltaAsksAmount - aveAsksDeltaAmount) {
          // 需要(買い) 減→価格低下
          // 需要(買い)増 →価格上昇基準電力価格で買い注文を入れる。
          if (aveBidsDeltaAmount - deltaBidsAmount > 0) {
            console.log('p<0,Bが大きい');
          } else {
            // 供給 売り増→価格低下
            // 需要 買い増→価格上昇,基準電力価格で買い注文を入れる。
            if (deltaAsksAmount - aveAsksDeltaAmount > 0) {
              console.log('p<0,Sが大きい');
            }
          }
        }
      }
    }
  });
});
