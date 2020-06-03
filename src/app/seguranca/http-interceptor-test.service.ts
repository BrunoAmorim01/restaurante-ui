import { AuthServiceTest } from './auth.service-test';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorTestService implements HttpInterceptor{

  constructor(private auth: AuthServiceTest) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercptor reqp', req)
    if(this.auth.isAccessTokenInvalido){
        this.auth.obterNovoAccessToken().subscribe(response=>{
          this.auth.armazenarToken(response);
        });
        const authReq= req.clone({
          headers: new HttpHeaders()
          .append('Authorization','Bearer ' + localStorage.getItem('tokena'))
        })

        console.log('headers', authReq)
      return next.handle(authReq);
    }else{      
      const authReq= req.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('tokena')}`
        })
      })
      return next.handle(authReq);
    }
  }
 
  
}
