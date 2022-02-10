import { ChatOnSubmitEvent } from '../../../view/chats/create/create.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Chat, StudentAccount } from '@local/common';
import { ChatApplicationService } from 'projects/shared/src/lib/services/chats/chat.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  studentAccounts$: Observable<StudentAccount[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly chatApp: ChatApplicationService,
  ) {
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    this.studentAccounts$ = this.studentAccount$.pipe(
      mergeMap((myAccount) => this.studentAccApp.list$().pipe(map((students) => students.filter((student) => student.id != myAccount.id)))),
    );
  }

  ngOnInit(): void {}

  async onSubmit($event: ChatOnSubmitEvent) {
    await this.chatApp.create(
      new Chat({
        title: $event.title,
        user1_id: $event.user1_id,
        user1_name: $event.user1_name,
        user2_id: $event.user2_id,
        user2_name: $event.user2_name,
        is_deleted: false,
      }),
    );
  }
}
