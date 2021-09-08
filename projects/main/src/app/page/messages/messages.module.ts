import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { MessagesModule } from '../../view/messages/messages.module';
import { MessageModule } from '../../view/messages/message/message.module';


@NgModule({
  declarations: [
    MessagesComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MessagesModule,
    MessageModule
  ]
})
export class AppMessagesModule { }
