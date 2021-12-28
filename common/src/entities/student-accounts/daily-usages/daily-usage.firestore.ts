import { StudentAccountFirestore } from '..';
import { DailyUsage } from './daily-usage';
import { FirestoreDataConverter } from 'firebase/firestore';

export class DailyUsageFirestore {
  static collectionID = 'daily_usages';
  static documentID = 'daily_usage_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${DailyUsageFirestore.collectionID}/{${DailyUsageFirestore.documentID}}`;

  static converter: FirestoreDataConverter<DailyUsage> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new DailyUsage(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${DailyUsageFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${DailyUsageFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
