import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, uploadString, getDownloadURL, UploadMetadata } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly storage: Storage) { }

  async getURL(path: string) {
    return getDownloadURL(ref(this.storage, path));
  }

  upload(path: string, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) {
    return new Promise<string | null>((resolve, reject) => {
      uploadBytes(ref(this.storage, path), data, metadata)
        .then((snapshot) => resolve(getDownloadURL(snapshot.ref)))
        .catch((reason) => reject(reason));
    });
  }

  /**
   *
   * @param path
   * @param dataURL starts with `data:`
   */
  uploadDataURL(path: string, dataURL: string, metadata?: UploadMetadata) {
    return new Promise<string | null>((resolve, reject) => {
      uploadString(ref(this.storage, path), dataURL, "data_url", metadata)
        .then((snapshot) => resolve(getDownloadURL(snapshot.ref)))
        .catch((reason) => reject(reason));
    });
  }
}
