import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {


  private price = new BehaviorSubject<number>(0);

  price$ = this.price.asObservable();

  
addPrice(value:number){
  this.price.next(this.price.value +  value);
}

removePrice(value:number){
  this.price.next(this.price.value - value)
}



  constructor() { }
}
