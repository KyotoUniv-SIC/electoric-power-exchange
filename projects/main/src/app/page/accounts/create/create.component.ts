import { CreateOnSubmitEvent } from '../../../view/accounts/create/create.component';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrimaryAsk, RoomChange } from '@local/common';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';
import { DailyUsageApplicationService } from 'projects/shared/src/lib/services/daily-usages/daily-usage.application.service';
import { PrimaryAskApplicationService } from 'projects/shared/src/lib/services/primary-asks/primary-ask.application.service';
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
    private router: Router,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly roomChangeApp: RoomChangeApplicationService,
    private readonly dailyUsageApp: DailyUsageApplicationService,
    private readonly primaryAskApp: PrimaryAskApplicationService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  async onSubmit($event: CreateOnSubmitEvent) {
    const roomID = $event.building + $event.room;
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
    await this.roomChangeApp.create(new RoomChange({ student_account_id: student.id, room_id_before: '', room_id_after: roomID }));
    const usages = await this.dailyUsageApp.list();
    const first = new Date();
    first.setMonth(first.getMonth() - 1);
    first.setDate(1);
    first.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setDate(1);
    end.setHours(0, 0, 0, 0);
    console.log(first, end);
    const uupxAmount =
      usages
        .filter((usage) => (usage.room_id = roomID))
        .filter((usage) => (usage.created_at as Timestamp).toDate() >= first && (usage.room_id = roomID))
        .filter((usage) => (usage.created_at as Timestamp).toDate() < end)
        .reduce((previous, current) => previous + parseInt(current.amount_kwh_str), 0) * 1000000;
    await this.primaryAskApp.create(new PrimaryAsk({ account_id: student.id, price_ujpy: '27000000', amount_uupx: uupxAmount.toString() }));
    await this.router.navigate(['/accounts/account']);
  }
}
