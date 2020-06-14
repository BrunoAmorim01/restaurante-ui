import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/crud.service";
import { Cliente } from "../model/cliente";
import { environment } from "src/environments/environment";
import { OAuthService } from "angular-oauth2-oidc";
import { HttpClient } from "@angular/common/http";

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
}
