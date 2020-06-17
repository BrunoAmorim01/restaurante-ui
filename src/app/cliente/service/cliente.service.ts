import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { Cliente } from "../model/cliente";
import { environment } from "src/environments/environment";
import { OAuthService } from "angular-oauth2-oidc";
import { HttpClient, HttpParams } from "@angular/common/http";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ClienteService extends CrudService<Cliente> {
  constructor(
    protected http: HttpClient,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/clientes`, oauthService);
  }

  listFilter(nome: string, pagina: Number, itensPorPagina: Number) {
    let params = new HttpParams({
      fromObject: {
        page: pagina.toString(),
        size: itensPorPagina.toString(),
      },
    });

    if (nome) {
      params = params.append("nome", nome);
    }

    return this.http.get<any>(this.API_URL, { params }).pipe(take(1));
  }
}
