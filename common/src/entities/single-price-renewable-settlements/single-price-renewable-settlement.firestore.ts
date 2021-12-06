import { FirestoreDataConverter } from 'firebase/firestore';
import { SinglePriceRenewableSettlement } from './single-price-renewable-settlement';

export class SinglePriceRenewableSettlementFirestore {
  static collectionID = 'single_price_renewable_settlements';
  static documentID = 'single_price_renewable_settlement_id';
  static virtualPath = `${SinglePriceRenewableSettlementFirestore.collectionID}/${SinglePriceRenewableSettlementFirestore.documentID}`;

  static converter: FirestoreDataConverter<SinglePriceRenewableSettlement> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new SinglePriceRenewableSettlement(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${SinglePriceRenewableSettlementFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${SinglePriceRenewableSettlementFirestore.collectionPath()}/${id}`;
  }
}
