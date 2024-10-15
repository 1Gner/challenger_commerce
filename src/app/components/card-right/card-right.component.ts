import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { QuantitySharedService } from '../../services/quantity-shared.service';
import { PriceService } from '../../services/price.service';
import { CommonModule } from '@angular/common';
import { ModuleFormat } from 'module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsCartComponent } from '../products-cart/products-cart.component';
import { SelectProductService } from '../../services/select-product.service';
import { StatusService } from '../../services/status.service';


interface Produto {
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
}

@Component({
  selector: 'app-card-right',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-right.component.html',
  styleUrl: './card-right.component.scss'
})
export class CardRightComponent implements OnInit {

  empty = true;

  quantity: number = 0;
  price: number = 0;

  product: string = ""
  precoU: number = 0
  precoT: number = 0
  quantidade: number = 0

  productComponentMap = new Map<string, ComponentRef<ProductsCartComponent>>();



  @ViewChild('container', { read: ViewContainerRef, static: false }) container!: ViewContainerRef;



  constructor(
    private serviceQuantity: QuantitySharedService
    , private priceservice: PriceService
    , private selecTProd: SelectProductService
    , private status:StatusService

  ) {

  }



  ngOnInit(): void {





    this.serviceQuantity.quantity$.subscribe((newQuantity: number) => {
      this.quantity = newQuantity;
      if (this.quantity > 0) {
        this.empty = false;

      } else {
        this.empty = true;
      }
    });

    this.selecTProd.getProdutos$().subscribe(produtos => {
      this.clearContainer();
      produtos.forEach((produto, chave) => {
        this.addOrUpdateComponent2(chave, produto)
        
      })
    });

    this.priceservice.price$.subscribe((newPrice: number) => {
      this.price = newPrice;
    })



  }




  onSubmit() {
    this.status.onStatus();
    }
  

  removeItem(productKey: string) {
    const componentRef = this.productComponentMap.get(productKey);
    this.priceservice.removePrice(componentRef?.instance.precoTotal || 0)
    this.serviceQuantity.removeComp(componentRef?.instance.quantidade || 0);
    this.selecTProd.updateRemoverQuantidade(productKey, componentRef?.instance.quantidade || 0);
    
    

    if (componentRef) {
      componentRef.destroy();
      this.productComponentMap.delete(productKey);
      this.selecTProd.deletaProduto(productKey);
      
    }



  }

  addOrUpdateComponent2(prod: string, objetct: Produto) {

    if (this.container) {
      if (this.productComponentMap.has(prod)) {
       
      } else {
        const componentRef = this.container.createComponent(ProductsCartComponent);
        componentRef.instance.precoTotal = objetct.precoTotal;
        componentRef.instance.precoUnitario = objetct.precoUnitario;
        componentRef.instance.produto = prod;
        componentRef.instance.quantidade = objetct.quantidade;
        this.productComponentMap.set(prod, componentRef);

        componentRef.instance.remove.subscribe(() => this.removeItem(prod));

        if (objetct.quantidade == 0) {
          
          componentRef.destroy();
          this.productComponentMap.delete(prod);
          this.selecTProd.deletaProduto(prod)
        }
      }
    }
  }




  clearContainer() {
    if (this.container) {
      this.container.clear();
      this.productComponentMap.clear();
    }
  }


}