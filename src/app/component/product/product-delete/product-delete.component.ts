import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product!: Product; // Declaração da variável product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const proId = this.route.snapshot.paramMap.get('proId'); // Obtém o ID do produto da rota
    this.productService.readById(proId!).subscribe(product => {
      this.product = product; // Atribui o produto recebido à variável product
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.product.proId!).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!');  
      this.router.navigate(['/products']); // Redireciona para a lista de produtos
    });
  }

  cancel(): void {
    this.router.navigate(['/products']); // Redireciona para a lista de produtos
  }
}
