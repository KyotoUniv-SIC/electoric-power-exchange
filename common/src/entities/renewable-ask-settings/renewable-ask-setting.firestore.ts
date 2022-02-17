import { FirestoreDataConverter } from 'firebase/firestore';
import { RenewableAskSetting } from './renewable-ask-setting';

export class RenewableAskSettingFirestore {
  static collectionID = 'renewable_ask_settings';
  static documentID = 'renewable_ask_setting_id';
  static virtualPath = `${RenewableAskSettingFirestore.collectionID}/{${RenewableAskSettingFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableAskSetting> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableAskSetting(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RenewableAskSettingFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableAskSettingFirestore.collectionPath()}/${id}`;
  }
}
