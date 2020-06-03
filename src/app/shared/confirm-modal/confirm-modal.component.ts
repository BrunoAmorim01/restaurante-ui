import { BehaviorSubject } from 'rxjs';
import { ModalMessageService } from './../modal-message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

export class DialogData {
  constructor(){
    this.msgConfirm ='Ok',
    this.msgCancel='Cancelar'
  }
  titulo: string;
  mensagem: string;
  msgCancel: string ='Cancelar';
  msgConfirm:string ='Confirmar';
  acao:boolean;
}

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  

  constructor(public dialogRef:MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData ,
    ) { 
      //data.acao=false;
    }
  
  ngOnInit(): void {
    
  }

  onCancelClick(){
  this.data.acao=false;
  this.dialogRef.close(false);
  
  }
  onConfirmClick(){
    this.data.acao=true;
    this.dialogRef.close(true);
  }
  
  getAcao(){
    return this.data.acao;
  }
}
