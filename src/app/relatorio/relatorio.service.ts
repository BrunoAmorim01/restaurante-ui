import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { url } from "inspector";
import { take } from "rxjs/operators";
import { ArquivoService } from "../shared/arquivo.service";

@Injectable({
  providedIn: "root",
})
export class RelatorioService {
  private API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API}/relatorios`;
  }

  pedidosPorData() {
    return this.http.get<Blob>(`${this.API_URL}/listar-pedidos`, {
      responseType: "blob" as "json",
    });
  }
}
