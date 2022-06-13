import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { StudentAccount } from '@local/common';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  student$: Observable<StudentAccount> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly authApp: AuthApplicationService,
  ) {
    this.user$ = authState(this.auth);
    this.student$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
  }

  ngOnInit(): void {}

  async onSubmit($event: string) {
    await this.authApp.changeEmail($event);
    alert('メールアドレスが変更されました');
    await this.authApp.confirmEmail();
    alert('確認メールを再送信しました');
  }
}
