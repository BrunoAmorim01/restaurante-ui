import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { Estado } from "../model/estado";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthServiceTest } from "src/app/seguranca/auth.service-test";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EstadoService extends CrudService<Estado> {
  constructor(
    protected http: HttpClient,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/estados`, oauthService);
  }

  porSigla(sigla: string) {
    const params = new HttpParams().append("sigla", sigla);
    return this.http
      .get<Estado>(this.API_URL + "/por-sigla", { params })
      .pipe(take(1));
  }
}
