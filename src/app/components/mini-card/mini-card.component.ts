import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QuantitySharedService } from '../../services/quantity-shared.service';
import { PriceService } from '../../services/price.service';
import { CardRightComponent } from '../card-right/card-right.component';
import { SelectProductService } from '../../services/select-product.service';





@Component({
  selector: 'app-mini-card',
  standalone: true,
  imports: [CommonModule, CardRightComponent],
  templateUrl: './mini-card.component.html',
  styleUrl: './mini-card.component.scss'
})
export class MiniCardComponent implements OnInit {
  addedToCart = false;
  quantity: number = 0;
  @Input()
  photo: string = "";
  @Input()
  tipes: string = "";
  @Input()
  product: string = "";
  @Input()
  price: number = 0;
  


  priceT: number = 0;


  constructor(private serviceQuantity: QuantitySharedService, private priceservice: PriceService, private selecTProd: SelectProductService) { }

  addToCart() {
    this.quantity++;
    this.addedToCart = true;
    this.serviceQuantity.addQuantity();
    this.priceservice.addPrice(this.price);
    this.priceT = this.price * this.quantity;
    this.selecTProd.init(this.product, this.quantity, this.priceT, this.price);
    this.selecTProd.initProduto(this.product, this.quantity, this.priceT)


  }

  increase() {
    this.quantity++;
    this.serviceQuantity.addQuantity();
    this.priceservice.addPrice(this.price);
    this.priceT = this.price * this.quantity;
    this.selecTProd.init(this.product, this.quantity, this.priceT, this.price);
    this.selecTProd.updateQuantidade(this.product, this.quantity)
  }

  decrease() {
    if (this.quantity > 0) {
      this.quantity--;
      this.serviceQuantity.removeQuantity();
      this.priceservice.removePrice(this.price);
      this.priceT = this.price * this.quantity;
      this.selecTProd.init(this.product, this.quantity, this.priceT, this.price);
      this.selecTProd.updateQuantidade(this.product, this.quantity)
    }

    if (this.quantity == 0) {
      this.quantity = 0;
      this.addedToCart = false;
      this.selecTProd.deletaProduto(this.product);
    }


  }

  ngOnInit() {

    this.selecTProd.getProdutos$().subscribe(produtos => {
      produtos.forEach((produto,chave) => {
      
      })

      
      if (produtos.has(this.product)) {
        this.quantity = produtos.get(this.product)?.quantidade || 0;
      
      }else{
        this.quantity = 0;
      }
      if (this.quantity == 0) {
        this.quantity = 0;
        this.addedToCart = false;
        
      }
    });


  }

}

