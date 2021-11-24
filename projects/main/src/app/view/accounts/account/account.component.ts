import { Component, OnInit, Input } from '@angular/core';
import { User } from '@firebase/auth';

@Component({
  selector: 'view-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @Input()
  user?: User | null;

  constructor() {}

  ngOnInit(): void {}
}
