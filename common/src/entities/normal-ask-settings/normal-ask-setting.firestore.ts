import { FirestoreDataConverter } from 'firebase/firestore';
import { NormalAskSetting } from './normal-ask-setting';

export class NormalAskSettingFirestore {
  static collectionID = 'normal_ask_settings';
  static documentID = 'normal_ask_setting_id';
  static virtualPath = `${NormalAskSettingFirestore.collectionID}/{${NormalAskSettingFirestore.documentID}}`;

  static converter: FirestoreDataConverter<NormalAskSetting> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalAskSetting(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${NormalAskSettingFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalAskSettingFirestore.collectionPath()}/${id}`;
  }
}
