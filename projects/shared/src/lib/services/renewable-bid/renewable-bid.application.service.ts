import { RenewableBidService } from './renewable-bid.service';
import { Injectable } from '@angular/core';
import { RenewableBid } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class RenewableBidApplicationService {
  constructor(private readonly renewableBid: RenewableBidService) {}

  create(data: RenewableBid) {
    return this.renewableBid.create(data);
  }
}
