import { StudentAccountFirestore } from '../.';
import { MonthlyUsage } from './monthly-usage';
import { FirestoreDataConverter } from 'firebase/firestore';

export class MonthlyUsageFirestore {
  static collectionID = 'monthly_usages';
  static documentID = 'monthly_usage_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${MonthlyUsageFirestore.collectionID}/${MonthlyUsageFirestore.documentID}`;

  static converter: FirestoreDataConverter<MonthlyUsage> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new MonthlyUsage(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${MonthlyUsageFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${MonthlyUsageFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
