import { FirestoreDataConverter } from 'firebase/firestore';
import { Account } from './account';

export class AccountFirestore {
  static collectionID = 'accounts';
  static documentID = 'account_id';
  static virtualPath = `${AccountFirestore.collectionID}/${AccountFirestore.documentID}`;

  static converter: FirestoreDataConverter<Account> = {
    toFirestore: (data) => ({...data}),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Account(data);
    }
  };

  static collectionPath() {
    return `${AccountFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${AccountFirestore.collectionPath()}/${id}`;
  }
}
