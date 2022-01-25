import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomChangeInfrastructureService } from './room-change.infrastructure.service';
import { RoomChange } from '@local/common';

export interface IRoomChangeInfrastructureService {
  get(id: string): Promise<RoomChange | undefined>;
  get$(id: string): Observable<RoomChange | undefined>;
  list(): Promise<RoomChange[]>;
  list$(): Observable<RoomChange[]>;
  listGroup(): Promise<RoomChange[]>;
  listGroup$(): Observable<RoomChange[]>;
  create(data: RoomChange): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class RoomChangeService {
  private iRoomChangeInfrastructure: IRoomChangeInfrastructureService;

  constructor(readonly roomChangeInfrastructure: RoomChangeInfrastructureService) {
    this.iRoomChangeInfrastructure = roomChangeInfrastructure;
  }

  get(id: string) {
    return this.iRoomChangeInfrastructure.get(id);
  }

  get$(id: string) {
    return this.iRoomChangeInfrastructure.get$(id);
  }

  list() {
    return this.iRoomChangeInfrastructure.list();
  }
  
  list$() {
    return this.iRoomChangeInfrastructure.list$();
  }
  
  listGroup() {
    return this.iRoomChangeInfrastructure.listGroup();
  }
  
  listGroup$() {
    return this.iRoomChangeInfrastructure.listGroup$();
  }

  create(data: RoomChange) {
    return this.iRoomChangeInfrastructure.create(data);
  }
}
