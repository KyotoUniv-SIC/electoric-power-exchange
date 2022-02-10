import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInfrastructureService } from './message.infrastructure.service';
import { Message } from '@local/common';

export interface IMessageInfrastructureService {
  get(chatID: string, id: string): Promise<Message | undefined>;
  get$(chatID: string, id: string): Observable<Message | undefined>;
  list(chatID: string): Promise<Message[]>;
  list$(chatID: string): Observable<Message[]>;
  listGroup(): Promise<Message[]>;
  listGroup$(): Observable<Message[]>;
  create(data: Message): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private iMessageInfrastructure: IMessageInfrastructureService;

  constructor(readonly messageInfrastructure: MessageInfrastructureService) {
    this.iMessageInfrastructure = messageInfrastructure;
  }

  get(chatID: string, id: string) {
    return this.iMessageInfrastructure.get(chatID, id);
  }

  get$(chatID: string, id: string) {
    return this.iMessageInfrastructure.get$(chatID, id);
  }

  list(chatID: string) {
    return this.iMessageInfrastructure.list(chatID);
  }
  
  list$(chatID: string) {
    return this.iMessageInfrastructure.list$(chatID);
  }
  
  listGroup() {
    return this.iMessageInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iMessageInfrastructure.listGroup$();
  }

  create(data: Message) {
    return this.iMessageInfrastructure.create(data);
  }
}
