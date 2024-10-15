import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniCardComponent } from "./components/mini-card/mini-card.component";
import { CardRightComponent } from "./components/card-right/card-right.component";
import { PageProductComponent } from "./components/page-product/page-product.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { CommonModule } from '@angular/common';
import { StatusService } from './services/status.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniCardComponent, CardRightComponent, PageProductComponent, OrderConfirmComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Commerce_product';

  isOrderConfirmed = false;

  constructor(private status: StatusService) {

  }


  ngOnInit() {
    this.status.status$.subscribe((newStatus: boolean) => {
      this.isOrderConfirmed = newStatus
    })
  }

  
 


}
