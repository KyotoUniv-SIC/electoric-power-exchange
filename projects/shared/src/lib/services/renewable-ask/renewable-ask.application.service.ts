import { RenewableAskService } from './renewable-ask.service';
import { Injectable } from '@angular/core';
import { RenewableAsk } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskApplicationService {
  constructor(private readonly renewableAsk: RenewableAskService) {}

  create(data: RenewableAsk) {
    return this.renewableAsk.create(data);
  }
}
