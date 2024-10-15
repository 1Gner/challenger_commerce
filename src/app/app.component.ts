import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniCardComponent } from "./components/mini-card/mini-card.component";
import { CardRightComponent } from "./components/card-right/card-right.component";
import { PageProductComponent } from "./components/page-product/page-product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniCardComponent, CardRightComponent, PageProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Commerce_product';
}
