import { Endereco } from './endereco';

export interface Fornecedor {
  id: string;
  tipoPessoa: number;
  apelido: string;
  nome: string;
  documento: string;
  email: string;
  celular: string;
  telefone: string;
  endereco: Endereco;
  ativo: boolean;
  versao: string;
}
