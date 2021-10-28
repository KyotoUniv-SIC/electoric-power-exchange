import { AskService } from './ask.service';
import { Injectable } from '@angular/core';
import { AskRequest } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class AskApplicationService {
  constructor(private readonly ask: AskService) {}

  async create(data: AskRequest) {
    this.ask.create(data);
  }
}
