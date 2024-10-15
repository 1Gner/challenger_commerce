import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-produto-confirmed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-confirmed.component.html',
  styleUrl: './produto-confirmed.component.scss'
})
export class ProdutoConfirmedComponent {
  photo:string="";
  produto:string="";
  quantidade:number=0;
  precoUnitario:number=0;
  precoTotal:number=0;
}
