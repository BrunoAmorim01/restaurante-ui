import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, empty, of } from 'rxjs';
import { take, catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceTest } from '../seguranca/auth.service-test';

export class CrudService<T> {
  constructor(
    protected http: HttpClient,
    protected API_URL: string,
    protected oauthService: OAuthService,
    protected auth?: AuthServiceTest
  ) {}

  list() {
    return this.http.get<T[]>(this.API_URL).pipe(take(1));
    /*
    return this.getToken().pipe(
      switchMap((t) => {
        return this.http
          .get<T[]>(this.API_URL, {
            headers: this.getAuthorizationHeaderTest(t.access_token),
          })
          .pipe(take(1));
      })
    );*/
  }

  private novo(entidade: T) {
    return this.http.post(this.API_URL, entidade).pipe(take(1));

    /*
    return this.getToken().pipe(
      switchMap((t) => {
        return this.http.post(this.API_URL, entidade, {
          headers: this.getAuthorizationHeaderTest(t.access_token),
        });
        //.pipe(take(1));
      })
    );*/
  }

  private atualizar(entidade: T) {
    return this.http
      .put(`${this.API_URL}/${entidade['codigo']}`, entidade)
      .pipe(take(1));
    /*
    return this.getToken().pipe(
      switchMap((t) => {
        return this.http
          .put(`${this.API_URL}/${entidade["codigo"]}`, entidade, {
            headers: this.getAuthorizationHeaderTest(t.access_token),
          })
          .pipe(take(1));
      })
    );
    */
  }
  salvar(entidade: T) {
    if (entidade['id']) {
      return this.atualizar(entidade);
    }
    return this.novo(entidade);
  }

  porID(id: any) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
    /*
    return this.getToken().pipe(
      switchMap((t) => {
        return this.http
          .get<T>(`${this.API_URL}/${id}`, {
            headers: this.getAuthorizationHeaderTest(t.access_token),
          })
          .pipe(take(1));
      })
    );*/
  }

  deletar(id: any) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
    /*
    return this.getToken().pipe(
      switchMap((t) => {
        return this.http
          .delete(`${this.API_URL}/${id}`, {
            headers: this.getAuthorizationHeaderTest(t.access_token),
          })
          .pipe(take(1));
      })
    );*/
  }

  getAuthorizationHeader() {
    return new HttpHeaders().append(
      'Authorization',
      'Bearer ' + localStorage.getItem('tokena')
    );
  }

  getAuthorizationHeaderTest(accessToken: string) {
    return new HttpHeaders().append('Authorization', 'Bearer ' + accessToken);
  }

  getToken() {
    console.log('getToken');
    if (this.auth.isAccessTokenInvalido()) {
      console.log('getToken if');
      return this.auth.obterNovoAccessToken();
    } else {
      console.log('getTokenCrud else');
      return new Observable<any>((o) => {
        o.next({ access_token: localStorage.getItem('tokena') });
        o.complete();
      });
    }
  }
}
