import { FirestoreDataConverter } from 'firebase/firestore';
import { StudentAccount } from './student-account';

export class StudentAccountFirestore {
  static collectionID = 'student_accounts';
  static documentID = 'student_account_id';
  static virtualPath = `${StudentAccountFirestore.collectionID}/${StudentAccountFirestore.documentID}`;

  static converter: FirestoreDataConverter<StudentAccount> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new StudentAccount(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${StudentAccountFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${StudentAccountFirestore.collectionPath()}/${id}`;
  }
}
