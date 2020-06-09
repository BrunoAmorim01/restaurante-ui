import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ArquivoService {
  url = `${environment.API}/arquivos`;

  constructor(protected http: HttpClient) {}

  upload(files: Set<File>) {
    const data: FormData = new FormData();
    files.forEach((file) => data.append("file", file));

    return this.http.post(this.url, data, {
      observe: "events",
      reportProgress: true,
    });
  }

  read(): Observable<any> {
    return this.http.get(
      this.url + "/b0d8df43-7e0b-460d-9c62-a449c0c7cf29_cerveja-mock.png",
      {
        //responseType:'blob'
      }
    );
  }

  delete(nomeArquivo) {
    return this.http.delete(this.url + "/" + nomeArquivo).pipe(take(1));
  }

  getUrl(nomeArquivo) {
    return this.url + "/" + nomeArquivo;
  }

  handleFile(res: any, filename: string) {
    const file = new Blob([res], {
      type: res.type,
    });

    //IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {      
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = blob;
    link.download = filename;  

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
