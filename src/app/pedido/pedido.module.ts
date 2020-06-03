import { MatButtonModule } from "@angular/material/button";
import { NgxCurrencyModule } from "ngx-currency";
import { MatTableModule } from "@angular/material/table";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PedidoRoutingModule } from "./pedido-routing.module";
import { CadastroPedidoComponent } from "./cadastro-pedido/cadastro-pedido.component";
import { PesquisaPedidoComponent } from "./pesquisa-pedido/pesquisa-pedido.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [CadastroPedidoComponent, PesquisaPedidoComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    MatSortModule
  ] /*,
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorTestService,
      multi: true,      
    }
  ]*/,
})
export class PedidoModule {}
