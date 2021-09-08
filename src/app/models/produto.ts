export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  unidadeMedidaId: string;
  fornecedorId: string;
  ativo: boolean;
  versao: string;
}
