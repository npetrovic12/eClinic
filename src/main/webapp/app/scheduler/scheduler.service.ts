import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  selectedUser: any;

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }
}
