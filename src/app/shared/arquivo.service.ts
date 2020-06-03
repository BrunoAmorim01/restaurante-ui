import { Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  url = `${environment.API}/arquivos`;

  constructor(protected http: HttpClient) { }

  upload(files: Set<File>) {
    const data: FormData = new FormData();
    files.forEach(file => data.append('file', file));


    return this.http.post(this.url, data, {
      observe: 'events',
      reportProgress: true
    })
  }

  read():Observable<any> {
    return this.http.get(this.url + '/b0d8df43-7e0b-460d-9c62-a449c0c7cf29_cerveja-mock.png',
    {
      //responseType:'blob'
    })
  }

  delete(nomeArquivo){
    return this.http.delete(this.url + '/'+ nomeArquivo).pipe(take(1));
  }

  getUrl(nomeArquivo){
    return this.url + '/' + nomeArquivo
  }

}
