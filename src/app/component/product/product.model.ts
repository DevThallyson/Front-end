// src/app/product/product.model.ts

// PASSO 1: Adicione esta nova interface para Fornecedor
export interface Fornecedor {
    forId?: number; // O ID do fornecedor é o mínimo necessário para a associação
    // Você pode adicionar outras propriedades aqui se precisar delas no frontend,
    // por exemplo: forNomeFantasia?: string;
}

export interface Product {
    proId?: number;
    proNome: string;
    proDescricao?: string;
    proPrecoCusto: number | null;
    proPrecoVenda: number | null;
    proQuantidadeEstoque: number | null;
    proCategoria?: string;
    proCodigoBarras?: string;
    proMarca?: string;
    proUnidadeMedida?: string;
    proAtivo: boolean;
    proDataCadastro?: string;
    proDataAtualizacao?: string;
    // PASSO 2: Adicione esta linha para incluir o fornecedor no modelo do produto
    fornecedor?: Fornecedor;
}
