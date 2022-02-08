import { DeleteOnSubmitEvent, MessageOnSubmitEvent } from '../../../view/chats/chat/chat.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat, ChatDelete, Message, StudentAccount } from '@local/common';
import { ChatDeleteApplicationService } from 'projects/shared/src/lib/services/chat-deletes/chat-delete.application.service';
import { ChatApplicationService } from 'projects/shared/src/lib/services/chats/chat.application.service';
import { MessageApplicationService } from 'projects/shared/src/lib/services/chats/messages/message.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  chat$: Observable<Chat | undefined> | undefined;
  messages$: Observable<Message[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly chatApp: ChatApplicationService,
    private readonly chatDeleteApp: ChatDeleteApplicationService,
    private readonly messageApp: MessageApplicationService,
  ) {
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const chatID$ = this.route.params.pipe(map((parames) => parames.chat_id));
    this.chat$ = chatID$.pipe(mergeMap((chatID) => this.chatApp.get$(chatID)));
    this.messages$ = chatID$.pipe(
      mergeMap((chatID) => this.messageApp.list$(chatID)),
      map((messages) =>
        messages
          .filter((message) => message.is_deleted != true)
          // 昇順に並び替え（新規作成分はnullになる）
          .sort(function (first, second) {
            if (!first.created_at) {
              return -1;
            } else if (!second.created_at) {
              return 1;
            } else {
              if ((first.created_at as Timestamp).toDate() < (second.created_at as Timestamp).toDate()) {
                return -1;
              } else if ((first.created_at as Timestamp).toDate() > (second.created_at as Timestamp).toDate()) {
                return 1;
              } else {
                return 0;
              }
            }
          }),
      ),
    );
  }

  ngOnInit(): void {}

  async onSubmit($event: MessageOnSubmitEvent) {
    await this.messageApp.create(
      new Message({
        chat_id: $event.chatID,
        account_id: $event.accountID,
        text: $event.text,
        is_read: false,
        is_deleted: false,
      }),
    );
  }

  async onDelete($event: DeleteOnSubmitEvent) {
    await this.chatDeleteApp.create(new ChatDelete({ chat_id: $event.chatID }));
  }
}
