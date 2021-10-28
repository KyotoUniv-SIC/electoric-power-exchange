import { BidService } from './bid.service';
import { Injectable } from '@angular/core';
import { BidRequest } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class BidApplicationService {
  constructor(private readonly bid: BidService) {}

  async create(data: BidRequest) {
    this.bid.create(data);
  }
}
