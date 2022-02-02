import { autoID } from '../../auto-id';
import { IInsufficientBalanceInfrastructureService } from './insufficient-balance.service';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionGroup,
  query,
  QueryConstraint,
  doc,
  getDoc,
  docData,
  getDocs,
  collectionData,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { InsufficientBalance } from '@local/common';
import { InsufficientBalanceFirestore } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class InsufficientBalanceInfrastructureService implements IInsufficientBalanceInfrastructureService {
  constructor(private readonly firestore: Firestore) {}

  collection(studentAccountID: string, ...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, InsufficientBalanceFirestore.collectionPath(studentAccountID));

    return (queryConstraints.length > 0 ? query(ref, ...queryConstraints) : ref).withConverter(InsufficientBalanceFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, InsufficientBalanceFirestore.collectionID);

    return (queryConstraints.length > 0 ? query(ref, ...queryConstraints) : ref).withConverter(InsufficientBalanceFirestore.converter);
  }

  document(studentAccountID: string, id?: string) {
    const ref = collection(this.firestore, InsufficientBalanceFirestore.collectionPath(studentAccountID));

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path, autoID())).withConverter(
      InsufficientBalanceFirestore.converter,
    );
  }

  get(studentAccountID: string, id: string) {
    return getDoc(this.document(studentAccountID, id)).then((snapshot) => snapshot.data());
  }

  get$(studentAccountID: string, id: string) {
    return docData(this.document(studentAccountID, id));
  }

  list(studentAccountID: string) {
    return getDocs(this.collection(studentAccountID)).then((snapshots) => snapshots.docs.map((doc) => doc.data()));
  }

  list$(studentAccountID: string) {
    return collectionData(this.collection(studentAccountID));
  }

  listGroup() {
    return getDocs(this.collectionGroup()).then((snapshots) => snapshots.docs.map((doc) => doc.data()));
  }

  listGroup$() {
    return collectionData(this.collectionGroup());
  }

  create(data: InsufficientBalance) {
    const doc = this.document(data.student_account_id);
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
