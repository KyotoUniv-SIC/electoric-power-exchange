import { CreateOnSubmitEvent } from '../../../view/accounts/create/create.component';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomChange } from '@local/common';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';
import { RoomChangeApplicationService } from 'projects/shared/src/lib/services/room-changes/room-change.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private auth: AuthApplicationService,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly roomChangeApp: RoomChangeApplicationService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  async onSubmit($event: CreateOnSubmitEvent) {
    const uid = await this.auth.signup(
      {
        type: 'email',
        name: $event.name,
        email: $event.mail,
        password: $event.password,
      },
      $event.name,
    );
    if (!uid) {
      this.snackBar.open('Faied to create new account!', 'Close');
      return;
    }
    const student = await this.studentAccApp.getByUid(uid);
    await this.roomChangeApp.create(new RoomChange({ student_account_id: student.id, room_id_before: '', room_id_after: '' }));
  }
}
