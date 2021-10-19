import { AskService } from './ask.service';
import { Injectable } from '@angular/core';
import { proto } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class AskApplicationService {
  constructor(private readonly ask: AskService) {}
}
