import { NormalAskService } from './normal-ask.service';
import { Injectable } from '@angular/core';
import { NormalAsk } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class NormalAskApplicationService {
  constructor(private readonly normalAsk: NormalAskService) {}

  create(data: NormalAsk) {
    return this.normalAsk.create(data);
  }
}
