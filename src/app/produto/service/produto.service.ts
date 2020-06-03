import { OAuthService } from "angular-oauth2-oidc";
import { AuthServiceTest } from "./../../seguranca/auth.service-test";

import { take, delay, switchMap, catchError } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { Produto } from "./../model/Produto";
import { CrudService } from "./../../shared/crud.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, empty } from "rxjs";
import { ProdutoFilter } from "../produto-pesquisa/produto-pesquisa.component";

@Injectable({
  providedIn: "root",
})
export class ProdutoService extends CrudService<Produto> {
  constructor(
    protected http: HttpClient,
    protected auth: AuthServiceTest,
    protected oauthService: OAuthService
  ) {
    super(http, `${environment.API}/produtos`, auth, oauthService);
  }

  listFilter(filtro: ProdutoFilter) {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString(),
      },
    });

    if (filtro.nome) {
      params = params.append("nome", filtro.nome);
    }
    if (filtro.categoria) {
      params = params.append("categoria", filtro.categoria.id.toString());
    }

    return this.http
      .get<any>(`${environment.API}/produtos`, {
        params        
      })
      .pipe(take(1));

    /*
    return this.getToken().pipe(
      take(1),
      switchMap((p) => {
        //console.log('getTokenCrud', p)

        return this.http
          .get<any>(`${environment.API}/produtos`, {
            params,
            headers: this.getAuthorizationHeaderTest(p.access_token),
          })
          .pipe(take(1));
      })
    );*/
  }

  porNome(nome) {
    return this.http.get<Produto[]>(`${environment.API}/produtos/por-nome`, {
      params: new HttpParams().append("nome", nome),
    });
  }

  porNome2(nome) {
    return this.getToken().pipe(
      take(1),
      switchMap((t) => {
        const produto$ = this.http.get<Produto[]>(
          `${environment.API}/produtos/por-nome`,
          {
            params: this.getParams(nome),
            headers: this.getAuthorizationHeaderTest(t.access_token),
          }
        );
        return produto$;
      })
    );
  }
  getParams(nome) {
    return new HttpParams().append("nome", nome);
  }

  getHeaders() {
    return new HttpHeaders().append(
      "Authorization",
      "Bearer " + localStorage.getItem("tokena")
    );
  }

  /*
  getToken() {
    if (this.auth.isAccessTokenInvalido()) {
      return this.auth
        .obterNovoAccessToken()
        .pipe(take(1))
        .subscribe(
          (response) => {
            console.log("Novo access token criado!");
            this.auth.armazenarToken(response);
            delay(1000);
          },
          (error) => {
            console.error("Auth guard error", error);
          }
        );
    } else {
      return empty();
    }
  }*/

  getToken1() {
    if (this.auth.isAccessTokenInvalido()) {
      return this.auth.obterNovoAccessToken().pipe(
        catchError((error) => {
          console.log("erro gettoken 1", error);
          return error;
        })
        /*
        shareReplay(),        
        retryWhen((errors) => {
          return errors.pipe(
            delayWhen(() => timer(1000)),
            tap((error) => {
              console.log("erro gettoken 1", error);
            })
          );
        })*/
      );
    } else {
      return new Observable((o) => {
        o.next({ access_token: localStorage.getItem("tokena"), valido: true });
        o.complete();
      });
    }
  }
}
