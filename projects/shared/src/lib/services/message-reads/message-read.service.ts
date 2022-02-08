import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageReadInfrastructureService } from './message-read.infrastructure.service';
import { MessageRead } from '@local/common';

export interface IMessageReadInfrastructureService {
  get(id: string): Promise<MessageRead | undefined>;
  get$(id: string): Observable<MessageRead | undefined>;
  list(): Promise<MessageRead[]>;
  list$(): Observable<MessageRead[]>;
  listGroup(): Promise<MessageRead[]>;
  listGroup$(): Observable<MessageRead[]>;
  create(data: MessageRead): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class MessageReadService {
  private iMessageReadInfrastructure: IMessageReadInfrastructureService;

  constructor(readonly messageReadInfrastructure: MessageReadInfrastructureService) {
    this.iMessageReadInfrastructure = messageReadInfrastructure;
  }

  get(id: string) {
    return this.iMessageReadInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iMessageReadInfrastructure.get$(id);
  }

  list() {
    return this.iMessageReadInfrastructure.list();
  }
  
  list$() {
    return this.iMessageReadInfrastructure.list$();
  }
  
  listGroup() {
    return this.iMessageReadInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iMessageReadInfrastructure.listGroup$();
  }

  create(data: MessageRead) {
    return this.iMessageReadInfrastructure.create(data);
  }
}
