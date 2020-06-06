import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API}/dashboard`;
  }

  getMediaValorTotalPedidos() {
    return this.http
      .get<Number>(this.API_URL + "/venda-media-mes-atual")
      .pipe(take(1));
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
