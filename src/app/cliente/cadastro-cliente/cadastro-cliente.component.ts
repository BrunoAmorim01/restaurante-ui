import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TipoPessoa } from "../model/tipo-pessoa";
import { Subject } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { EnderecoService } from "../service/endereco.service";
import { Bairro } from "../model/bairro";
import { EstadoService } from "../service/estado.service";
import { Estado } from "../model/estado";
import { CidadeService } from "../service/cidade.service";
import { Cidade } from "../model/cidade";
import { BairroService } from "../service/bairro.service";

@Component({
  selector: "app-cadastro-cliente",
  templateUrl: "./cadastro-cliente.component.html",
  styleUrls: ["./cadastro-cliente.component.scss"],
})
export class CadastroClienteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  form: FormGroup;
  tipoPessoaValues = Object.keys(TipoPessoa).filter(String);
  estados$;
  cidades$;
  bairros$;

  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService
  ) {}

  ngOnInit(): void {
    this.estados$ = this.estadoService.list();

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
      numero: [null],
    });

    this.form.controls["cep"].valueChanges
      .pipe(
        tap((v) => console.log(v)),
        filter((value) => value.length === 8),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
        switchMap((value) => this.enderecoService.pesquisaPorCep(value))
      )
      .subscribe((response: any) => {
        console.log("response cep", response);
        /*
        this.form.controls["bairro"].setValue(
          (new Bairro().nome = response.bairro)
        );*/
        this.form.controls["logradouro"].setValue(response.logradouro);
      });
  }

  onSubmit() {
    console.log("form values", this.form.value);
  }

  listarCidades(estado: Estado) {
    this.cidades$ = this.cidadeService.listarCidadesPorEstado(estado.id);
  }

  listarBairros(cidade: Cidade) {
    this.bairros$ = this.bairroService.listarBairrosPorCidadeId(cidade.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
