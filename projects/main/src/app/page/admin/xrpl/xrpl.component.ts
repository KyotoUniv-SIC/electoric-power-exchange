import { Component, OnInit } from '@angular/core';
import { AdminAccountApplicationService } from 'projects/shared/src/lib/services/admin-accounts/admin-account.application.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-xrpl',
  templateUrl: './xrpl.component.html',
  styleUrls: ['./xrpl.component.css'],
})
export class XrplComponent implements OnInit {
  constructor(private readonly adminAccApp: AdminAccountApplicationService) {
    const admin$ = this.adminAccApp.getByNeme$('admin').pipe(map((admins) => admins[0]));
  }

  ngOnInit(): void {}
}
