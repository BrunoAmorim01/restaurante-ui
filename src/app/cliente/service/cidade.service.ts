import { Injectable } from "@angular/core";
import { Cidade } from "../model/cidade";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";
import { CrudService } from "src/app/shared/crud.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CidadeService extends CrudService<Cidade> {
  constructor(
    protected http: HttpClient,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/cidades`, oauthService);
  }

  listarCidadesPorEstado(idEstado) {
    const params = new HttpParams().append("estado", idEstado);
    return this.http.get<Cidade>(`${environment.API}/cidades`, { params });
  }

  listarCidadesPorEstadoENome(idEstado, nomeCidade) {
    const params = new HttpParams()
      .append("estado", idEstado)
      .append("cidade", nomeCidade);
    return this.http.get(`${environment.API}/cidades/por-nome`, { params });
  }
}
