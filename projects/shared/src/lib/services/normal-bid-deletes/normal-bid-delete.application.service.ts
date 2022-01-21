import { Injectable } from '@angular/core';
import { NormalBidDeleteService } from './normal-bid-delete.service';
import { NormalBidDelete } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class NormalBidDeleteApplicationService {
  
  constructor(private readonly normalBidDelete: NormalBidDeleteService) {}
}