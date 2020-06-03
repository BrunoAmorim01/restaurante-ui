import { Pedido } from "./../model/pedido";
import { SnackBarMessageService } from "./../../shared/snack-bar-message.service";
import { Observable, empty, of } from "rxjs";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { PedidoService } from "./../service/pedido.service";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { StatusPedido } from '../model/status-pedido.enum';

@Injectable({
  providedIn: "root",
})
export class PedidoResolverGuard implements Resolve<Pedido> {
  constructor(
    private pedidoService: PedidoService,
    private snackBarService: SnackBarMessageService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Pedido | Observable<Pedido> | Promise<Pedido> {
    const param = route.params["id"];
    //console.log("pedido guard param", param);
    if (param && !isNaN(param)) {
      //console.log("if pedido guard");
      const result = this.pedidoService.porID(param).pipe(
        catchError((err) => {
          console.log("catchError guard Pedido", err),
            this.snackBarService.openSnackbar("Pedido inválido ou inexistente");

          return empty();
          /*
          new Observable<any>((o) => {            
            o.next(err);
            o.complete();
          });*/
        })
      );
      return result;
    } else {
      //console.log("else pedido guard");
      return of({
        desconto: 0,
        dataCriacao: null,
        id: null,
        itens: [],
        observacao: null,
        statusPedido: StatusPedido.ABERTO,
        total: 0,
      });
    }
  }
}
