import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  private status = new BehaviorSubject<boolean>(false);
  status$ = this.status.asObservable();


  onStatus(){
    this.status.next(true);
  }

  offStatus(){
    this.status.next(false);
  }

   constructor() { }
}
