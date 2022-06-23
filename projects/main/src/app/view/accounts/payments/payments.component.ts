import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MonthlyPayment, StudentAccount } from '@local/common';

@Component({
  selector: 'view-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  monthlyPayments?: MonthlyPayment[] | null;

  constructor() {}

  ngOnInit(): void {}
}
