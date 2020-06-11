import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class RelatorioService {
  private API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API}/relatorios`;
  }

  pedidosPorData(dataInicio: Date, dataFim: Date) {
    dataInicio.setHours(0, 0, 0);
    dataFim.setHours(23, 59, 59);
    console.log("datainicio", dataInicio);
    console.log("datafim", dataFim);

    const params = new HttpParams()
      .append("inicio", moment(dataInicio).format("YYYY-MM-DD HH:MM:SS"))
      .append("fim", moment(dataFim).format("YYYY-MM-DD HH:MM:SS"));
    return this.http.get<Blob>(`${this.API_URL}/listar-pedidos`, {
      params,
      responseType: "blob" as "json",
    });
  }
}
