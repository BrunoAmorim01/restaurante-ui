import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { Estado } from "../model/estado";
import { HttpClient } from "@angular/common/http";
import { AuthServiceTest } from "src/app/seguranca/auth.service-test";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";

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
}
