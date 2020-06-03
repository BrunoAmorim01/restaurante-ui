import { take, switchMap } from "rxjs/operators";
import { filter } from "rxjs/operators";
import { PedidoFilter } from "./../filter/pedido-filter";
import { environment } from "./../../../environments/environment";
import { AuthServiceTest } from "./../../seguranca/auth.service-test";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { CrudService } from "./../../shared/crud.service";
import { Injectable } from "@angular/core";
import { Pedido } from "../model/pedido";
import * as moment from "moment";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root",
})
export class PedidoService extends CrudService<Pedido> {
  constructor(
    protected http: HttpClient,
    protected auth: AuthServiceTest,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/pedidos`, auth, oauthService);
  }

  listFilter(filter: PedidoFilter) {
    let params = new HttpParams({
      fromObject: {
        page: filter.pagina.toString(),
        size: filter.itensPorPagina.toString(),
      },
    });

    if (filter.dataInicio) {
      filter.dataInicio.setHours(0, 0, 0);
      params = params.append(
        "dataInicio",
        moment(filter.dataInicio).format("YYYY-MM-DD HH:MM:SS")
      );
    }

    if (filter.dataFim) {
      filter.dataFim.setHours(22, 59, 59);
      params = params.append(
        "dataFim",
        moment(filter.dataFim).format("YYYY-MM-DD HH:MM:SS")
      );
    }

    if(filter.statusPedido){
      params = params.append('statusPedido', filter.statusPedido.toString())
    }

    /*
    let headers= new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });*/

    return this.http
      .get<any>(`${environment.API}/pedidos`, {
        params, //,
        //headers,
      })
      .pipe(take(1));
  }

  concluirPedido(codigo: Int8Array) {
    const params = new HttpParams().append("codigo", codigo.toString());
    return this.http
      .put<any>(`${environment.API}/pedidos/${codigo}/concluir`, {
        params,
      })
      .pipe(take(1));
  }

  cancelarPedido(codigo: Int8Array) {
    const params = new HttpParams().append("codigo", codigo.toString());
    return this.http
      .put<any>(`${environment.API}/pedidos/${codigo}/cancelar`, {
        params,
      })
      .pipe(take(1));
      
  }
}
