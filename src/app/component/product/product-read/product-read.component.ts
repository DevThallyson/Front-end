import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  products!: Product[]; // Lista de produtos
  displayedColumns = ['proId', 'proNome', 'proQuantidadeEstoque', 'proPrecoCusto', 'proPrecoVenda', 'action']; // Colunas exibidas na tabela

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products; // Atribui os dados recebidos à lista de produtos
      console.log(products); // Exibe os dados no console para depuração
    });
  }
}
