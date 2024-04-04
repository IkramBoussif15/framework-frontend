import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateContextDtoService {
  
  userCurrent: any;

  constructor() { }

  setUserCurrent(user: any) {
    this.userCurrent = user;
  }

  getuserCureent() {
    return this.userCurrent;
  }
}
