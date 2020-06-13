import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EnderecoService {
  urlApi = "https://viacep.com.br/ws";

  constructor(private http: HttpClient) {}

  pesquisaPorCep(cep) {
    const url = `${this.urlApi}/${cep}/json`;
    return this.http.get(url).pipe(take(1));
  }
}
