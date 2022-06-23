import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MonthlyPayment, StudentAccount } from '@local/common';

@Component({
  selector: 'view-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input()
  user?: User | null;
  @Input()
  studentAccount?: StudentAccount | null;
  @Input()
  monthlyPayment?: MonthlyPayment | null;
  @Input()
  createdAt?: Date | null;

  constructor() {}

  ngOnInit(): void {}
}
