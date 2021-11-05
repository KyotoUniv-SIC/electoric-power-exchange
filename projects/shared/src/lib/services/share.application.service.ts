import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  /**
   * web share apiが有効かどうか
   */
  isWebShareAPIAvailable() {
    return (navigator as any).share !== undefined;
  }

  /**
   * web share apiを使う
   * @param url
   * @param title
   * @param text
   */
  webShareAPI(url: string, title?: string, text?: string) {
    (navigator as any).share({
      url: url,
      title: title,
      text: text,
    });
  }
}
