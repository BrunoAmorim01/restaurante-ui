import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TipoPessoa } from "../model/tipo-pessoa";

@Component({
  selector: "app-cadastro-cliente",
  templateUrl: "./cadastro-cliente.component.html",
  styleUrls: ["./cadastro-cliente.component.scss"],
})
export class CadastroClienteComponent implements OnInit {
  form: FormGroup;
  tipoPessoaValues = Object.keys(TipoPessoa).filter(String);

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    console.log('tipopessoa',this.tipoPessoaValues);
    this.form = this.fb.group({
      nome: [null, Validators.required],
      tipoPessoa: [null, Validators.required],
      identificacao: [null],
      telefone: [null],
      email: [null],
      cep: [null],
      estado: [null],
      cidade: [null],
      bairro: [null],
      logradouro: [null],
      numero: [null]
    });
  }

  onSubmit() {
    console.log('form values', this.form.value)
    
  }
}
