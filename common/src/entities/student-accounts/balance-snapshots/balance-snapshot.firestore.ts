import { StudentAccountFirestore } from '..';
import { BalanceSnapshot } from './balance-snapshot';
import { FirestoreDataConverter } from 'firebase/firestore';

export class BalanceSnapshotFirestore {
  static collectionID = 'balance-snapshots';
  static documentID = 'balance-snapshot_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${BalanceSnapshotFirestore.collectionID}/{${BalanceSnapshotFirestore.documentID}}`;

  static converter: FirestoreDataConverter<BalanceSnapshot> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new BalanceSnapshot(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${BalanceSnapshotFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${BalanceSnapshotFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
