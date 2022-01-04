import { DiscountPrice } from './discount-price';
import { FirestoreDataConverter } from 'firebase/firestore';

export class DiscountPriceFirestore {
  static collectionID = 'discount_prices';
  static documentID = 'discount_price_id';
  static virtualPath = `${DiscountPriceFirestore.collectionID}/{${DiscountPriceFirestore.documentID}}`;

  static converter: FirestoreDataConverter<DiscountPrice> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new DiscountPrice(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${DiscountPriceFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${DiscountPriceFirestore.collectionPath()}/${id}`;
  }
}
