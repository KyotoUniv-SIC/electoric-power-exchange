import { FirestoreDataConverter } from 'firebase/firestore';
import { BalanceSnapshot } from './balance-snapshot';
import { StudentAccountFirestore } from '..';

export class BalanceSnapshotFirestore {
  static collectionID = 'balance_snapshots';
  static documentID = 'balance_snapshot_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${BalanceSnapshotFirestore.collectionID}/{${BalanceSnapshotFirestore.documentID}}`;

  static converter: FirestoreDataConverter<BalanceSnapshot> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new BalanceSnapshot(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${BalanceSnapshotFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${BalanceSnapshotFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
