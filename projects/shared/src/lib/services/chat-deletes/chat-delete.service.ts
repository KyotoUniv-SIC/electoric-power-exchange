import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatDeleteInfrastructureService } from './chat-delete.infrastructure.service';
import { ChatDelete } from '@local/common';

export interface IChatDeleteInfrastructureService {
  get(id: string): Promise<ChatDelete | undefined>;
  get$(id: string): Observable<ChatDelete | undefined>;
  list(): Promise<ChatDelete[]>;
  list$(): Observable<ChatDelete[]>;
  listGroup(): Promise<ChatDelete[]>;
  listGroup$(): Observable<ChatDelete[]>;
  create(data: ChatDelete): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class ChatDeleteService {
  private iChatDeleteInfrastructure: IChatDeleteInfrastructureService;

  constructor(readonly chatDeleteInfrastructure: ChatDeleteInfrastructureService) {
    this.iChatDeleteInfrastructure = chatDeleteInfrastructure;
  }

  get(id: string) {
    return this.iChatDeleteInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iChatDeleteInfrastructure.get$(id);
  }

  list() {
    return this.iChatDeleteInfrastructure.list();
  }
  
  list$() {
    return this.iChatDeleteInfrastructure.list$();
  }
  
  listGroup() {
    return this.iChatDeleteInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iChatDeleteInfrastructure.listGroup$();
  }

  create(data: ChatDelete) {
    return this.iChatDeleteInfrastructure.create(data);
  }
}
