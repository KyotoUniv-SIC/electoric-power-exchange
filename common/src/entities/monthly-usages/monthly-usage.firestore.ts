import { FirestoreDataConverter } from 'firebase/firestore';
import { MonthlyUsage } from './monthly-usage';

export class MonthlyUsageFirestore {
  static collectionID = 'monthly_usages';
  static documentID = 'monthly_usage_id';
  static virtualPath = `${MonthlyUsageFirestore.collectionID}/${MonthlyUsageFirestore.documentID}`;

  static converter: FirestoreDataConverter<MonthlyUsage> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new MonthlyUsage(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${MonthlyUsageFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${MonthlyUsageFirestore.collectionPath()}/${id}`;
  }
}
