import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { SelectProductService } from '../../services/select-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-cart.component.html',
  styleUrl: './products-cart.component.scss'
})
export class ProductsCartComponent {
  produto:string="";
  quantidade:number=0;
  precoUnitario:number=0;
  precoTotal:number=0;

  constructor(){

  }

  @Output() remove = new EventEmitter<void>(); 

  removeItem() {
    this.remove.emit();
  }

}
