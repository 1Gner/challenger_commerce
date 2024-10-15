import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProdutoConfirmedComponent } from '../produto-confirmed/produto-confirmed.component';
import { QuantitySharedService } from '../../services/quantity-shared.service';
import { PriceService } from '../../services/price.service';
import { SelectProductService } from '../../services/select-product.service';
import { StatusService } from '../../services/status.service';
import { CommonModule } from '@angular/common';

interface Produto {
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  photo:string;
}


@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})






export class OrderConfirmComponent implements OnInit {

   priceOrder:number= 0

  constructor(
    private priceservice: PriceService
    , private selecTProd: SelectProductService
    , private status: StatusService
  ) {

  }


  produtoConfirmedComponent = new Map<string, ComponentRef<ProdutoConfirmedComponent>>();



  @ViewChild('orders', { read: ViewContainerRef, static: false }) orders!: ViewContainerRef;



  ngOnInit() {
    this.selecTProd.getProdutos$().subscribe(produtos => {
      this.clearContainer();
      produtos.forEach((produto, chave) => {
        this.addOrUpdateComponent2(chave, produto)

      })


    this.priceservice.price$.subscribe((newPrice:number) => {
      this.priceOrder = newPrice;
    })
    });

  }

  addOrUpdateComponent2(prod: string, objetct: Produto) {

    if (this.orders) {
      if (this.produtoConfirmedComponent.has(prod)) {

      } else {
        const componentRef = this.orders.createComponent(ProdutoConfirmedComponent);
        
        componentRef.instance.photo = objetct.photo;
        componentRef.instance.precoTotal = objetct.precoTotal;
        componentRef.instance.precoUnitario = objetct.precoUnitario;
        componentRef.instance.produto = prod;
        componentRef.instance.quantidade = objetct.quantidade;
        this.produtoConfirmedComponent.set(prod, componentRef);

        

        if (objetct.quantidade == 0) {
          componentRef.destroy();
          this.produtoConfirmedComponent.delete(prod);
          this.selecTProd.deletaProduto(prod)
        }
      }
    }
  }

 

  clearContainer() {
    if (this.orders) {
      this.orders.clear();
      this.produtoConfirmedComponent.clear();
    }
  }

  closeOrderConfirmation() {
    this.status.offStatus();
  }


}
