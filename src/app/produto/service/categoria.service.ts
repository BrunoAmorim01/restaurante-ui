import { OAuthService } from "angular-oauth2-oidc";
import { Categoria } from "./../model/Categoria";
import { take } from "rxjs/operators";

import { RestauranteHttp } from "./../../seguranca/restaurante-http";
import { environment } from "./../../../environments/environment";
import { CrudService } from "./../../shared/crud.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceTest } from "src/app/seguranca/auth.service-test";

@Injectable({
  providedIn: "root",
})
export class CategoriaService extends CrudService<Categoria> {
  url: string;

  constructor(
    protected http: HttpClient,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/categorias`, oauthService);
    //this.url = `${environment.API}/categorias`;
  }
  /*
  list():Observable<Categoria[]>{
    const headers = new HttpHeaders()
    .append('Authorization','Bearer ' + localStorage.getItem('tokena'))
      //.append('Content-Type', 'application/x-www-form-urlencoded')
      //.append('access_token',localStorage.getItem('tokena'))
      //console.log('json parse',localStorage.getItem('tokena'))
    return this.http.get<Categoria[]>(this.url,{headers})//.pipe(take(1))
  } */

  /*
  constructor(protected http: HttpClient) {
    //super(http,`${environment.API}categorias?access_token=${JSON.parse(window.sessionStorage.getItem('token')).access_token}`); 
    super(http,`${environment.API}categorias?access_token=${localStorage.getItem('tokena')}`); 
  }
  */
}
