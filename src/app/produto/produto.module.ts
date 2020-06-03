import { SharedModule } from './../shared/shared.module';
import { CampoControlErroComponent } from './../shared/campo-control-erro/campo-control-erro.component';
import { CategoriaModule } from './../categoria/categoria.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxMaskModule } from 'ngx-mask';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [ProdutoCadastroComponent, ProdutoPesquisaComponent],
  imports: [
    CommonModule,    
    ProdutoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    //MatDialogModule,
    MatProgressSpinnerModule,    
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),        
  ],
  exports:[]
})
export class ProdutoModule { }
