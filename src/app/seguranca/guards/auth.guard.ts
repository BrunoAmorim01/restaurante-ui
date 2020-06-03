import { take } from 'rxjs/operators';
import { AuthServiceTest } from '../auth.service-test';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthServiceTest,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAccessTokenInvalido()){
      console.log('Navegação com access token inválido. Obtendo novo token...');
      this.auth.obterNovoAccessToken().pipe(take(1)).subscribe();
      if (this.auth.isAccessTokenInvalido()) {
        this.router.navigate(['/login']);
          return false;
      }      
      return true;
    }else if(next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)){
      console.log('Não autorizado');
      return false;
    }
    return true;
  }
  
}
