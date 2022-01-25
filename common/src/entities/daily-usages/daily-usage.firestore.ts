import { FirestoreDataConverter } from 'firebase/firestore';
import { DailyUsage } from './daily-usage';

export class DailyUsageFirestore {
  static collectionID = 'daily_usages';
  static documentID = 'daily_usage_id';
  static virtualPath = `${DailyUsageFirestore.collectionID}/{${DailyUsageFirestore.documentID}}`;

  static converter: FirestoreDataConverter<DailyUsage> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new DailyUsage(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${DailyUsageFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${DailyUsageFirestore.collectionPath()}/${id}`;
  }
}
