import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.scss']
})
export class CampoControlErroComponent  {
  @Input() control: FormControl;
  @Input() label: string;
  constructor() { }  
  
  temErro():boolean{   
    return this.control.invalid && this.control.touched;
  }
  
  ErrorMessage (validatorValue?:string){

    if(this.control.hasError('required')){      
      return 'Campo obrigatório';
    }
    if(this.control.hasError('minlength')){
      let n =this.control.getError('minlength').requiredLength;      
      return 'Deve possuir ao menos ' + n + ' caracteres';
    }

    if(this.control.get(this.label).hasError('maxlength')){
      let n =this.control.getError('maxlength').requiredLength;      
      return 'Deve possuir no máximo ' + n + ' caracteres';
    }
  return;
  }    
  }

