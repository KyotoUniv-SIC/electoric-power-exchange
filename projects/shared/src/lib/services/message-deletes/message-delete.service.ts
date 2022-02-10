import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDeleteInfrastructureService } from './message-delete.infrastructure.service';
import { MessageDelete } from '@local/common';

export interface IMessageDeleteInfrastructureService {
  get(id: string): Promise<MessageDelete | undefined>;
  get$(id: string): Observable<MessageDelete | undefined>;
  list(): Promise<MessageDelete[]>;
  list$(): Observable<MessageDelete[]>;
  listGroup(): Promise<MessageDelete[]>;
  listGroup$(): Observable<MessageDelete[]>;
  create(data: MessageDelete): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class MessageDeleteService {
  private iMessageDeleteInfrastructure: IMessageDeleteInfrastructureService;

  constructor(readonly messageDeleteInfrastructure: MessageDeleteInfrastructureService) {
    this.iMessageDeleteInfrastructure = messageDeleteInfrastructure;
  }

  get(id: string) {
    return this.iMessageDeleteInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iMessageDeleteInfrastructure.get$(id);
  }

  list() {
    return this.iMessageDeleteInfrastructure.list();
  }
  
  list$() {
    return this.iMessageDeleteInfrastructure.list$();
  }
  
  listGroup() {
    return this.iMessageDeleteInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iMessageDeleteInfrastructure.listGroup$();
  }

  create(data: MessageDelete) {
    return this.iMessageDeleteInfrastructure.create(data);
  }
}
