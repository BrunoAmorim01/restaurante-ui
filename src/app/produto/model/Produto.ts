import { Categoria } from './Categoria';

export class Produto {
    constructor(){
        this.origem='NACIONAL';
        this.status = false;
        this.categoria = new Categoria();
    }
    id: number;
    nome: string;
    origem: string;
    preco: number;
    categoria: Categoria;
    descricao: string;
    quantidade: number;
    status: boolean;
    nomeArquivo: string;
}
