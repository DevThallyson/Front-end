import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Serviço singleton, disponível em toda a aplicação
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/produtos'; // URL base da API

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  // Exibe uma mensagem ao usuário
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  // Cria um novo produto no banco de dados
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Retorna todos os produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Busca um produto por ID
  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  // Atualiza um produto existente
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.proId}`;
    return this.http.put<Product>(url, product);
  }

  // Exclui um produto pelo ID
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

  // Retorna o número total de produtos (armazenado localmente)
  private _productCount = 0;

  setProductCount(count: number): void {
    this._productCount = count;
  }

  getProductCount(): number {
    return this._productCount;
  }

  // Retorna a quantidade de produtos com estoque baixo
  getEstoqueBaixo(): Observable<number> {
    const url = `${this.baseUrl}/estoque-baixo`;
    return this.http.get<number>(url);
  }
}
