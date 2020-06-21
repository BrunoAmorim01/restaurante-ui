import { ItemPedido } from "./item-pedido";
import { StatusPedido } from "./status-pedido.enum";
import { Cliente } from "src/app/cliente/model/cliente";
export class Pedido {
  constructor() {
    this.desconto = 0;
    this.total = 0;
    this.statusPedido = StatusPedido.ABERTO;
    //this.itens =[]
  }
  id: Number;
  dataCriacao: Date;
  desconto: number;
  total: number;
  statusPedido: StatusPedido;
  itens: ItemPedido[];
  observacao: String;
  cliente: Cliente;
  username:string;
}
