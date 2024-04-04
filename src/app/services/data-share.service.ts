import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  SharingData = new Subject();  
  pendingRequest = new Subject();  
  sharedMessage :Subject<any>;

  // added 
  private booleanSubject = new BehaviorSubject<boolean>(false);

  public booleanValue$: Observable<boolean> = this.booleanSubject.asObservable();

  setBooleanValue(value: boolean) {
    this.booleanSubject.next(value);
  }

  constructor() { 
    this.sharedMessage = new Subject<any>();


  }

}
