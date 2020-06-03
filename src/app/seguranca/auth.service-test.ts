import { empty } from "rxjs";
import { ErrorHandlerService } from "./../shared/error-handler.service";
import { catchError, tap, take, map } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthServiceTest {
  private baseUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandlerService: ErrorHandlerService
  ) {
    //this.baseUrl = `${environment.API}oauth/token`;
    this.baseUrl = `${environment.API_LOGIN}/protocol/openid-connect/token`;
    //this.carregarToken();
  }

  login(loginPayload: HttpParams) {
    const headers = new HttpHeaders().append(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    loginPayload = loginPayload
      .set("client_id", "restaurante")
      //.set("grant_type", "authorization_code")
      .set("grant_type", "password")
      .set("client_id", "restaurante")
      .set("client_secret", "6711f75d-6871-4bde-8b6d-a585e0942674");
      
    //.append('Authorization', 'Basic YW5ndWxhcjE6YW5ndWxhcg==');
    //console.log(window.)
    return this.http.post<any>(this.baseUrl, loginPayload.toString(), {
      headers,
      withCredentials: true,
    });
  }

  obterNovoAccessTokenbackup() {
    const headers = new HttpHeaders().append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const loginPayload = new HttpParams()
      .set("client_id", "restaurante")
      .set("refresh_token", localStorage.getItem("tokenr"))
      .set("grant_type", "refresh_token");

    return this.http.post<any>(this.baseUrl, loginPayload.toString(), {
      headers,
      withCredentials: true,
    });
  }

  obterNovoAccessToken() {
    const headers = new HttpHeaders().append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const loginPayload = new HttpParams()
      .set("client_id", "restaurante")
      .set("refresh_token", localStorage.getItem("tokenr"))
      .set("grant_type", "refresh_token");

    return this.http
      .post<any>(this.baseUrl, loginPayload.toString(), {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error("obterNovoAccessToken error", error);
          this.errorHandlerService.handle(error);
          return empty();
        }),
        tap((t) => {
          this.armazenarToken(t);
        })
      );
  }

  private carregarToken() {
    const token = localStorage.getItem("tokena");

    console.log("armazenar token");
    this.armazenarToken(token);

    /*
      console.log('limparAccessToken')
      this.limparAccessToken()*/
  }

  armazenarToken(token) {
    console.log("armazenar token");
    this.jwtPayload = this.jwtHelper.decodeToken(token.access_token);
    //console.log('armazenarToken jwtPayload', this.jwtPayload);
    //console.log('armazenarToken access_token', token.access_token);
    //console.log('armazenarToken token', token);
    localStorage.setItem("tokena", token.access_token);
    localStorage.setItem("tokenr", token.refresh_token);
  }

  limparAccessToken() {
    localStorage.removeItem("tokena");
    localStorage.removeItem("tokenr");
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem("tokena");
    //console.log('isAccessTokenInvalido', token)
    console.log("token invalido", this.jwtHelper.isTokenExpired(token));
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  logout() {
    // /tokens/encerrar-sessao
    // /sso/logout
    return this.http.post(`${environment.API}/sso/logout`, {
      headers: new HttpHeaders().append(
        "Authorization",
        "Bearer " + localStorage.getItem("tokenr")
      ),
      withCredentials: true,
    });
  }
}
