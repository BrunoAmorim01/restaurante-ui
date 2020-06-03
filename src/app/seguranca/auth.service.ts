import { environment } from './../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { take, catchError, tap, map } from 'rxjs/operators';
import { EMPTY, empty } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
    this.oauthTokenUrl = `${environment.API}oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
      
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post<any>(this.oauthTokenUrl,body,{headers, withCredentials:true})
    .pipe(
      //take(1),
      catchError(error =>{
        console.log('login erro', error);
        if(error.status===400){
          if(error.error === 'invalid_grant'){
            console.error('Usuário ou senha inválida!');
          }
        }        
        return error;
      }),
      tap(resp =>console.log('auth logon resp', resp))
      //map(response =>this.armazenarToken(response.access_token))

      )    
   
  }

  obterNovoAccessToken() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = 'grant_type=refresh_token';
    
    return this.http.post<any>(this.oauthTokenUrl, body,{headers, withCredentials:true})
      .pipe(
        take(1),
        catchError( error =>{
          console.error('Erro ao renovar token.', error);         
          return empty(); 
        }),
        tap(response=>{
          console.log('obterNovoAccessToken sucesso', response);
          this.armazenarToken(response.access_token);
        })
      )
    }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for(const role of roles){
      if(this.temPermissao(role)){
        return true;
      }
    }
    return false;      
  }

  private carregarToken() {
   const token = localStorage.getItem('token');
   if(token){
    this.armazenarToken(token);
   }
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);    
    localStorage.setItem('token',token);
  }

  
}
