import { Categoria } from './../model/Categoria';
import { SnackBarMessageService } from './../../shared/snack-bar-message.service';
import { catchError } from 'rxjs/operators';
import { ProdutoService } from './../service/produto.service';
import { Produto } from './../model/Produto';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,  Resolve } from '@angular/router';
import { Observable, of, empty } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoResolverGuard implements Resolve<Produto> {

  constructor(private service:ProdutoService, 
    private snackBarService:SnackBarMessageService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {
      
    
    if(route.params && route.params['id'] && !isNaN(route.params['id'])){     
      const result = this.service.porID(route.params['id'])
      .pipe(
        catchError((err)=>{
          console.log('catchError guard Produto', err)
          this.snackBarService.openSnackbar('Produto inválido ou inexistente')
          
          return empty();
        })
      )     
      
      return result;
    }else{      
      return of({
        id: null,
        nome: null,
        origem: 'NACIONAL',
        preco: null,
        categoria: new Categoria(),
        descricao: null,
        quantidade: null,
        status: false,
        nomeArquivo:null
      });
    }
    
  }
  
  
}
