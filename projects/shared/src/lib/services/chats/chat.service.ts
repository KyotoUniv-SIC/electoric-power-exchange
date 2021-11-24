import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatInfrastructureService } from './chat.infrastructure.service';
import { Chat } from '@local/common';

export interface IChatInfrastructureService {
  get(id: string): Promise<Chat | undefined>;
  get$(id: string): Observable<Chat | undefined>;
  list(): Promise<Chat[]>;
  list$(): Observable<Chat[]>;
  listGroup(): Promise<Chat[]>;
  listGroup$(): Observable<Chat[]>;
  create(data: Chat): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private iChatInfrastructure: IChatInfrastructureService;

  constructor(readonly chatInfrastructure: ChatInfrastructureService) {
    this.iChatInfrastructure = chatInfrastructure;
  }

  get(id: string) {
    return this.iChatInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iChatInfrastructure.get$(id);
  }

  list() {
    return this.iChatInfrastructure.list();
  }
  
  list$() {
    return this.iChatInfrastructure.list$();
  }
  
  listGroup() {
    return this.iChatInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iChatInfrastructure.listGroup$();
  }

  create(data: Chat) {
    return this.iChatInfrastructure.create(data);
  }
}
