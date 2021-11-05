import { FirestoreDataConverter } from 'firebase/firestore';
import { User } from './user';

export class UserFirestore {
  static collectionID = 'users';
  static documentID = 'user_id';
  static virtualPath = `${UserFirestore.collectionID}/${UserFirestore.documentID}`;

  static converter: FirestoreDataConverter<User> = {
    toFirestore: (data) => ({...data}),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new User(data);
    }
  };

  static collectionPath() {
    return `${UserFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${UserFirestore.collectionPath()}/${id}`;
  }
}
