import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { Bairro } from "../model/bairro";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BairroService extends CrudService<Bairro> {
  constructor(
    protected http: HttpClient,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/bairros`, oauthService);
  }

  listarBairrosPorCidadeId(idCidade) {
    const params = new HttpParams().append("cidade", idCidade);
    return this.http.get<Bairro>(this.API_URL, { params });
  }

  listarBairrosPorCidadeIdENome(idCidade, nomeBairro) {
    const params = new HttpParams()
      .append("cidade", idCidade)
      .append("bairro", nomeBairro);
    return this.http.get<Bairro>(this.API_URL + "/por-nome", { params });
  }
}
