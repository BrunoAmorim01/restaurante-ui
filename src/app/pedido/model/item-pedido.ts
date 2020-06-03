import { Produto } from './../../produto/model/Produto';
import { Pedido } from './pedido';
export class ItemPedido {    
    id:Number;
    quantidade:Number;
    valorUnitario:Number;
    produto:Produto;
    pedido:Pedido;
}
