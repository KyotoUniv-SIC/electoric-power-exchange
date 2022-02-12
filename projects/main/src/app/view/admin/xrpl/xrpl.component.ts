import { Component, Input, OnInit } from '@angular/core';
import { AdminAccount } from '@local/common';

@Component({
  selector: 'view-xrpl',
  templateUrl: './xrpl.component.html',
  styleUrls: ['./xrpl.component.css'],
})
export class XrplComponent implements OnInit {
  @Input()
  adminAccount?: AdminAccount | null;

  constructor() {}

  ngOnInit(): void {}
}
