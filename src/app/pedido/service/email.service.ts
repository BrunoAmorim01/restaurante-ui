import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  constructor(protected http: HttpClient) {}

  enviarPedido(codigoPedido) {
    const params = new HttpParams()
      .append("codigo", codigoPedido.toString())
      .append("enviarEmail", "true");
    return this.http
      .get<any>(`${environment.API}/pedidos/${codigoPedido}`, {
        params,
      })
      .pipe(take(1));
  }
}
