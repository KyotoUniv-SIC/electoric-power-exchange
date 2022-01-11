import { SinglePriceNormalSettlement } from './single-price-normal-settlement';
import { FirestoreDataConverter } from 'firebase/firestore';

export class SinglePriceNormalSettlementFirestore {
  static collectionID = 'single_price_normal_settlements';
  static documentID = 'single_price_normal_settlement_id';
  static virtualPath = `${SinglePriceNormalSettlementFirestore.collectionID}/{${SinglePriceNormalSettlementFirestore.documentID}}`;

  static converter: FirestoreDataConverter<SinglePriceNormalSettlement> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new SinglePriceNormalSettlement(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${SinglePriceNormalSettlementFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${SinglePriceNormalSettlementFirestore.collectionPath()}/${id}`;
  }
}
