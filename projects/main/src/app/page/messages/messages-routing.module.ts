import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  { path: 'buy', component: MessageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
