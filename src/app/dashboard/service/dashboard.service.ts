import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { take, shareReplay, retryWhen, delayWhen, tap } from "rxjs/operators";
import { OAuthService } from "angular-oauth2-oidc";
import { timer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private API_URL: string;
  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.API_URL = `${environment.API}/dashboard`;
  }

  getMediaValorTotalPedidos() {
    const valorPedido$ = this.http
      .get<Number>(this.API_URL + "/venda-media-mes-atual")
      .pipe(
        shareReplay(),
        retryWhen((err) => {
          return err.pipe(
            delayWhen(() => timer(2000)),
            tap(() => console.log("retry valor total pedidos"))
          );
        })
      );

    return valorPedido$;
  }

  getRankingProdutos() {
    return this.http
      .get(this.API_URL + "/ranking-produtos-mais-vendidos-mes-atual")
      .pipe(take(1));
  }

  getValorTotalPedidos() {
    return this.http
      .get<Number>(this.API_URL + "/venda-total-mes-atual")
      .pipe(take(1));
  }
}
