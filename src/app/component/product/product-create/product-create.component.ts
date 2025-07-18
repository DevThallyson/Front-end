// src/app/product/product-create/product-create.component.ts

import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model'; // Certifique-se que Product está importado
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
    product: Product = {
    proNome: '',
    proDescricao: '',
    proPrecoCusto: null,
    proPrecoVenda: null,
    proQuantidadeEstoque: null,
    proCategoria: '',
    proCodigoBarras: '',
    proMarca: '',
    proUnidadeMedida: '',
    proAtivo: true,
    proDataCadastro: '',
    proDataAtualizacao: '',
    // PASSO 1: Inicialize a propriedade 'fornecedor' com um ID de teste.
    // MUITO IMPORTANTE: O fornecedor com este 'forId' DEVE EXISTIR no seu banco de dados MySQL.
    // Se você criou um fornecedor com ID 1 no MySQL, use { forId: 1 }.
    // Em um sistema real, este ID viria de um campo de seleção no formulário.
    fornecedor: { forId: 1 }
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // PASSO 2: Preencha as datas de cadastro e atualização automaticamente.
    // O formato toISOString().slice(0, 19) gera uma string como "YYYY-MM-DDTHH:mm:ss",
    // que é compatível com LocalDateTime do Spring Boot.
    const now = new Date();
    this.product.proDataCadastro = now.toISOString().slice(0, 19);
    this.product.proDataAtualizacao = now.toISOString().slice(0, 19);
  }
  
  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    },
    // PASSO 3: Adicione um tratamento de erro para ver o que o backend está retornando.
    error => {
      console.error('Erro ao criar produto:', error);
      // Tenta extrair uma mensagem de erro do objeto de erro do backend
      const errorMessage = error.error && error.error.message ? error.error.message : 'Erro desconhecido ao criar produto.';
      this.productService.showMessage(`Erro: ${errorMessage}`);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
