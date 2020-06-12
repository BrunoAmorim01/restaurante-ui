import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class EnderecoService {
  url = "https://viacep.com.br/ws";

  constructor(private http: HttpClient) {}

  pesquisaPorCep(cep) {
    const url = `${this.url}/${cep}/json`
    return this.http.get(url).pipe(take(1));
  }
}
