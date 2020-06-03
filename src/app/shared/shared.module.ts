import { SegurancaModule } from './../seguranca/seguranca.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { TemplateModule } from './../template/template.module';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MatTableResponsiveDirective } from './diretivas/mat-table-responsive/mat-table-responsive.directive';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClientModule,    
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    
    //MatDialogModule      
  ],
  declarations: [CampoControlErroComponent, ConfirmModalComponent, MatTableResponsiveDirective],
  exports:[CampoControlErroComponent,MatTableResponsiveDirective]
})
export class SharedModule { }
