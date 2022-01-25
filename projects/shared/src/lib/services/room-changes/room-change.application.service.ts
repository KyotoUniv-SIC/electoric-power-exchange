import { Injectable } from '@angular/core';
import { RoomChangeService } from './room-change.service';
import { RoomChange } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class RoomChangeApplicationService {
  
  constructor(private readonly roomChange: RoomChangeService) {}
}