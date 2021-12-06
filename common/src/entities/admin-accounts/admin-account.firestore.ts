import { FirestoreDataConverter } from 'firebase/firestore';
import { AdminAccount } from './admin-account';

export class AdminAccountFirestore {
  static collectionID = 'admin_accounts';
  static documentID = 'admin_account_id';
  static virtualPath = `${AdminAccountFirestore.collectionID}/${AdminAccountFirestore.documentID}`;

  static converter: FirestoreDataConverter<AdminAccount> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new AdminAccount(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${AdminAccountFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${AdminAccountFirestore.collectionPath()}/${id}`;
  }
}
