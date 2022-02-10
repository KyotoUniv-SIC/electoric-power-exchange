import { ChatsModule } from '../../view/chats/chats.module';
import { CreateModule } from '../../view/chats/create/create.module';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ChatsComponent, CreateComponent],
  imports: [CommonModule, ChatsRoutingModule, ChatsModule, CreateModule],
})
export class AppChatsModule {}
