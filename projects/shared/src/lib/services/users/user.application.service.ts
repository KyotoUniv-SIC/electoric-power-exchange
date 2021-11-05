import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class UserApplicationService {
  
  constructor(private readonly user: UserService) {}
}