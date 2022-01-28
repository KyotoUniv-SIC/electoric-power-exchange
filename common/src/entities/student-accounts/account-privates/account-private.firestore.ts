import { StudentAccountFirestore } from '..';
import { AccountPrivate } from './account-private';
import { FirestoreDataConverter } from 'firebase/firestore';

export class AccountPrivateFirestore {
  static collectionID = 'account_privates';
  static documentID = 'account_private_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${AccountPrivateFirestore.collectionID}/{${AccountPrivateFirestore.documentID}}`;

  static converter: FirestoreDataConverter<AccountPrivate> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new AccountPrivate(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${AccountPrivateFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${AccountPrivateFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
