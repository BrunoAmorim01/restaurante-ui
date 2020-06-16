import { TipoPessoa } from "./tipo-pessoa";
import { Bairro } from "./bairro";
import { Endereco } from "./endereco";

export class Cliente {
  id: number;
  nome: string;
  tipoCliente: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  endereco: Endereco;
  ativo: boolean;
}
