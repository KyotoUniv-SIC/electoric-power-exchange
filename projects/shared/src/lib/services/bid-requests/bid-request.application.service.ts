import { BidRequestService } from './bid-request.service';
import { Injectable } from '@angular/core';
import { BidRequest } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class BidRequestApplicationService {
  constructor(private readonly bidRequest: BidRequestService) {}

  create(data: BidRequest) {
    return this.bidRequest.create(data);
  }
}
