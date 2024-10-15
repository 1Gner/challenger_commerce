import { Component } from '@angular/core';
import { MiniCardComponent } from "../mini-card/mini-card.component";

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [MiniCardComponent],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.scss'
})
export class PageProductComponent {

}
