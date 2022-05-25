import { Injectable } from '@angular/core';
import { DeltaAmountService } from './delta-amount.service';
import { DeltaAmount } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class DeltaAmountApplicationService {
  
  constructor(private readonly deltaAmount: DeltaAmountService) {}
}