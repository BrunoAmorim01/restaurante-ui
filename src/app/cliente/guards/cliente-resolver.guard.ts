import { Injectable } from "@angular/core";
import { Cliente } from "../model/cliente";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, EMPTY } from "rxjs";
import { SnackBarMessageService } from "src/app/shared/snack-bar-message.service";
import { ClienteService } from "../service/cliente.service";
import { catchError } from "rxjs/operators";
import { ErrorHandlerService } from "src/app/seguranca/error-handler.service";

@Injectable({
  providedIn: "root",
})
export class ClienteResolverGuard implements Resolve<Cliente> {
  constructor(
    private service: ClienteService,
    private snackBarService: SnackBarMessageService,
    private errorHandlerService: ErrorHandlerService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Cliente | Observable<Cliente> | Promise<Cliente> {
    if (route.params && route.params["id"] && !isNaN(route.params["id"])) {
      const result = this.service.porID(route.params["id"]).pipe(
        catchError((err) => {
          console.log("catch Error guard Cliente", err);
          this.errorHandlerService.handle(err);
          this.snackBarService.openSnackbar("Cliente inválido ou inexistente");

          return EMPTY;
        })
      );
      return result;
    } else {      
      return new Cliente();
    }
  }
}
