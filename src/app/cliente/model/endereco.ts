import { Bairro } from "./bairro";

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: Bairro;
  numero: string;
}
