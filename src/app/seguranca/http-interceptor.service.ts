import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService /*implements HttpInterceptor*/{

  constructor(private authService: AuthService) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log('inter',req)
    if(this.authService/*.isUserLoggedIn()*/ && req.url.indexOf('basicauth')===-1){
      console.log('inter if')
      const authReq= req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //'Authorization': `Basic ${window.btoa(this.authService.username + ":" + this.authService.password)}`
        })
      });
      return next.handle(authReq);
    }else{
      console.log('inter else')
      return next.handle(req);
    }
  }
}
