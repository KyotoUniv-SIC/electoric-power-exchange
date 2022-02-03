import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Chat, StudentAccount } from '@local/common';
import { ChatApplicationService } from 'projects/shared/src/lib/services/chats/chat.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  chats$: Observable<Chat[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly chatApp: ChatApplicationService,
  ) {
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.chats$ = this.studentAccount$.pipe(mergeMap((account) => this.chatApp.list$(account.id)));
  }

  ngOnInit(): void {}
}
