import { SharedModule } from './../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CadastroRapidoComponent } from './cadastro-rapido/cadastro-rapido.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [CadastroRapidoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,    
    CategoriaRoutingModule
  ],
  exports:[
    CadastroRapidoComponent
  ]

})
export class CategoriaModule { }
