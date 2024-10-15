import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface Produto {
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  photo:string;
}



@Injectable({
  providedIn: 'root'
})




export class SelectProductService {


  


  private produtos = new Map<string, Produto>();
  private produtos$ = new BehaviorSubject<Map<string, Produto>>(this.produtos);




  initProduto(produto: string, quantidade: number, precoUnitario: number, photo:string) {
    const precoTotal = quantidade * precoUnitario;
    this.produtos.set(produto, { quantidade, precoUnitario, precoTotal ,photo});
    this.produtos$.next(this.produtos);
  }


  updateQuantidade(produto: string, quantidade: number) {
    const produtoAtual = this.produtos.get(produto);
    if (produtoAtual) {
      const precoTotal = quantidade * produtoAtual.precoUnitario;
      this.produtos.set(produto, { ...produtoAtual, quantidade, precoTotal });
      this.produtos$.next(this.produtos);
      console.log(this.produtos.get(produto))
      

    }
  }

  updateRemoverQuantidade(produto: string, valor: number) {
    const produtoAtual = this.produtos.get(produto);
    if (produtoAtual) {
      const quantidade = produtoAtual.quantidade - valor;
      const precoTotal = quantidade * produtoAtual.precoUnitario;
      this.produtos.set(produto, { ...produtoAtual, quantidade, precoTotal });
      this.produtos$.next(this.produtos);
  
      
    }
    
  }


  updatePrecoUnitario(produto: string, precoU: number) {
    const produtoAtual = this.produtos.get(produto);
    if (produtoAtual) {
      const precoTotal = produtoAtual.quantidade * precoU;
      this.produtos.set(produto, { ...produtoAtual, precoUnitario: precoU, precoTotal });
      this.produtos$.next(this.produtos);
    }
  }


  deletaProduto(produto: string) {
    const produtoAtual = this.produtos.get(produto);
    if (produtoAtual) {
      this.produtos.delete(produto);
    }
  }

  reset() {
    this.produtos.clear();
    this.produtos$.next(this.produtos);
  }

  getProdutos$() {
    return this.produtos$.asObservable();
  }



  constructor() {

  }


}
