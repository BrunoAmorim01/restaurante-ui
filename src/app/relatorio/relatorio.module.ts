import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioRoutingModule } from './relatorio-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskModule.forRoot()
  ]
})
export class RelatorioModule { }
