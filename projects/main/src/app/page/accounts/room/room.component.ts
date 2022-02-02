import { RoomOnSubmitEvent } from '../../../view/accounts/room/room.component';
import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { StudentAccount, RoomChange } from '@local/common';
import { RoomChangeApplicationService } from 'projects/shared/src/lib/services/room-changes/room-change.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  student$: Observable<StudentAccount> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly roomChangeApp: RoomChangeApplicationService,
  ) {
    this.user$ = authState(this.auth);
    this.student$ = this.user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
  }

  ngOnInit(): void {}

  async onSubmit($event: RoomOnSubmitEvent) {
    await this.roomChangeApp.create(
      new RoomChange({ student_account_id: $event.studentID, room_id_before: $event.before, room_id_after: $event.after }),
    );
  }
}
