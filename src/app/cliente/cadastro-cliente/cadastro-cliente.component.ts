import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { TipoPessoa } from "../model/tipo-pessoa";
import { Subject, EMPTY } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
  catchError,
} from "rxjs/operators";
import { EnderecoService } from "../service/endereco.service";
import { Bairro } from "../model/bairro";
import { EstadoService } from "../service/estado.service";
import { Estado } from "../model/estado";
import { CidadeService } from "../service/cidade.service";
import { Cidade } from "../model/cidade";
import { BairroService } from "../service/bairro.service";
import { ClienteService } from "../service/cliente.service";
import { ErrorHandlerService } from "src/app/seguranca/error-handler.service";
import { SnackBarMessageService } from "src/app/shared/snack-bar-message.service";

@Component({
  selector: "app-cadastro-cliente",
  templateUrl: "./cadastro-cliente.component.html",
  styleUrls: ["./cadastro-cliente.component.scss"],
})
export class CadastroClienteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  form: FormGroup;
  formControlEstado: FormControl;
  formControlCidade: FormControl;
  tipoPessoaValues = Object.keys(TipoPessoa).filter(String);
  estados$;
  cidades$;
  bairros$;

  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService,
    private clienteService: ClienteService,
    private errorHandlerService: ErrorHandlerService,
    private snackBarMessageService: SnackBarMessageService
  ) {}

  ngOnInit(): void {
    this.estados$ = this.estadoService.list();

    this.form = this.fb.group({
      nome: [null, Validators.required],
      tipoCliente: [null, Validators.required],
      cpfCnpj: [null],
      telefone: [null],
      email: [null],
      cep: [null],
      bairro: [null],
      logradouro: [null],
      complemento: [null],
      numero: [null],
      ativo: [null],
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
        this.form.controls["complemento"].setValue(response.complemento);
      });
  }

  onSubmit() {
    console.log("form values", this.form.value);
    if (this.form.valid) {
      this.clienteService
        .salvar(this.form.value)
        .pipe(
          catchError((err) => {
            this.errorHandlerService.handle(err);
            return EMPTY;
          })
        )
        .subscribe((Response) => {
          this.snackBarMessageService.openSnackbar("Cliente salvo com sucesso!");
        });
    }
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
