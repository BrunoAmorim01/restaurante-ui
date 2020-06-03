import { StatusPedido } from '../model/status-pedido.enum';

export class PedidoFilter {
  constructor() {
    this.pagina = 0, this.itensPorPagina = 5;
  }
  dataInicio: Date;
  dataFim:Date;
  statusPedido:StatusPedido[];
  pagina: number;
  itensPorPagina: number;
}
