import { Injectable } from '@angular/core';
import { StudentAccountService } from './student-account.service';
import { StudentAccount } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class StudentAccountApplicationService {
  
  constructor(private readonly studentAccount: StudentAccountService) {}
}