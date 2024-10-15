import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuantitySharedService {

  private quantity = new BehaviorSubject<number>(0);

  quantity$ = this.quantity.asObservable();

  addQuantity() {
    const currentQuantity = this.quantity.value;
    this.quantity.next(currentQuantity + 1);
  }

  removeQuantity() {
    const currentQuantity = this.quantity.value;
    if (currentQuantity > 0) {
      this.quantity.next(currentQuantity - 1);
    }

  }


  removeComp(Quan: number) {
    const currentQuantity = this.quantity.value;
    if (currentQuantity > 0) {
      this.quantity.next(currentQuantity - Quan);
    } else {
      this.quantity.next(0);
    }
  }






  constructor() { }
}
