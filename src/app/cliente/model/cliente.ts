import { TipoPessoa } from './tipo-pessoa';
import { Bairro } from './bairro';

export interface Cliente {
    id:number;
    nome:string;
    tipoCliente:string;
    cpfCnpj:string;
    telefone:string;
    email:string;
    cep:string;
    bairro: Bairro,
    logradouro: string,
    complemento: string,
    numero: string,
    ativo:boolean


}
