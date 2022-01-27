import { FirestoreDataConverter } from 'firebase/firestore';
import { AdminPrivate } from './admin-private';
import { AdminAccountFirestore } from '..';

export class AdminPrivateFirestore {
  static collectionID = 'admin_privates';
  static documentID = 'admin_private_id';
  static virtualPath = `${AdminAccountFirestore.virtualPath}/${AdminPrivateFirestore.collectionID}/{${AdminPrivateFirestore.documentID}}`;

  static converter: FirestoreDataConverter<AdminPrivate> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new AdminPrivate(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath(adminAccountID: string) {
    return `${AdminAccountFirestore.documentPath(adminAccountID)}/${AdminPrivateFirestore.collectionID}`;
  }

  static documentPath(adminAccountID: string, id: string) {
    return `${AdminPrivateFirestore.collectionPath(adminAccountID)}/${id}`;
  }
}
