import { PrimaryBidService } from './primary-bid.service';
import { Injectable } from '@angular/core';
import { PrimaryBid } from '@local/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PrimaryBidApplicationService {
  constructor(private readonly primaryBid: PrimaryBidService) {}

  get$(uid: string, id: string) {
    return this.primaryBid.get$(id).pipe(map((param) => (param?.account_id == uid ? param : undefined)));
  }

  list$(uid: string) {
    return this.primaryBid.list$().pipe(map((params) => params.filter((param) => param.account_id == uid)));
  }
}
