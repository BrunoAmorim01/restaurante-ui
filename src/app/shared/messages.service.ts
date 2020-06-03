import { FormControl, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private message = new Subject<any>();
  constructor() { }

  sendMessage(message: string){
    this.message.next(message);
  }

  getMessage():Observable<any>{
    return this.message.asObservable();
  }

  clearMessage(){
    this.message.next();
  }

  sendMessageErrorFormControl(control: AbstractControl){
    if(control.hasError('required')){      
      return 'Campo obrigatório';
    }
    if(control.hasError('minlength')){
      let n =control.getError('minlength').requiredLength;      
      return 'Deve possuir ao menos ' + n + ' caracteres';
    }

    if(control.hasError('maxlength')){
      let n =control.getError('maxlength').requiredLength;      
      return 'Deve possuir no máximo ' + n + ' caracteres';
    }

    if(control.hasError('max')){
      
      let n:Number =control.getError('max').max;      
      return 'Valor no máximo de R$' + n.toLocaleString()  ;
    }
  return;
  }
}
