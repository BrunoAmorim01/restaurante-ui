import { TipoPessoa } from "./tipo-pessoa";
import { Bairro } from "./bairro";
import { Endereco } from "./endereco";

export interface Cliente {
  id: number;
  nome: string;
  tipoCliente: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  endereco: Endereco;
  ativo: boolean;
}
