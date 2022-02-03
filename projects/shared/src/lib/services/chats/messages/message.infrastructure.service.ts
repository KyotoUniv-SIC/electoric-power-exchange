import { autoID } from '../auto-id';
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionGroup, query, QueryConstraint, doc, getDoc, docData, getDocs, collectionData, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { IMessageInfrastructureService } from './message.service';
import { Message } from '@local/common';
import { MessageFirestore } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class MessageInfrastructureService
  implements IMessageInfrastructureService {

  constructor(private readonly firestore: Firestore) {}

  collection(chatID: string, ...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, MessageFirestore.collectionPath(chatID));

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(MessageFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, MessageFirestore.collectionID);

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(MessageFirestore.converter);
  }

  document(chatID: string, id?: string) {
    const ref = collection(this.firestore, MessageFirestore.collectionPath(chatID));

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path, autoID())).withConverter(MessageFirestore.converter);
  }

  get(chatID: string, id: string) {
    return getDoc(this.document(chatID, id))
      .then(snapshot => snapshot.data());
  }

  get$(chatID: string, id: string) {
    return docData(this.document(chatID, id));
  }

  list(chatID: string) {
    return getDocs(this.collection(chatID))
      .then(snapshots => snapshots.docs.map(doc => doc.data()))
  }

  list$(chatID: string) {
    return collectionData(this.collection(chatID));
  }

  listGroup() {
    return getDocs(this.collectionGroup())
      .then(snapshots => snapshots.docs.map(doc => doc.data()))
  }

  listGroup$() {
    return collectionData(this.collectionGroup());
  }

  create(data: Message) {
    const doc = this.document(data.chat_id);
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
