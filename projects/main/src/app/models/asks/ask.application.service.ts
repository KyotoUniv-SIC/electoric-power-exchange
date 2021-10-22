import { AskService } from './ask.service';
import { Injectable } from '@angular/core';
import { AskRequest } from 'common/src/entities/asks';

@Injectable({
  providedIn: 'root',
})
export class AskApplicationService {
  constructor(private readonly ask: AskService) { }

  async create(data: AskRequest) {
    this.ask.create(data);
}
