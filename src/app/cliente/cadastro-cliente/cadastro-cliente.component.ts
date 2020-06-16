import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { TipoPessoa } from "../model/tipo-pessoa";
import { Subject, EMPTY, Observable, of } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
  catchError,
  delay,
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
import { ActivatedRoute } from "@angular/router";
import { Cliente } from "../model/cliente";

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
  estados$: Observable<Estado[]>;
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
    private snackBarMessageService: SnackBarMessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.estados$ = this.estadoService.list();

    this.formControlEstado = new FormControl();
    this.formControlCidade = new FormControl();

    this.initForm();

    const cliente: Cliente = this.activatedRoute.snapshot.data.cliente;
    console.log("CLiente", cliente);
    if (cliente) {
      this.form.patchValue(cliente);

      this.formControlEstado.setValue(cliente.endereco.bairro.cidade.estado);

      this.listarCidades(cliente.endereco.bairro.cidade.estado);

      this.formControlCidade.setValue(cliente.endereco.bairro.cidade);

      this.listarBairros(cliente.endereco.bairro.cidade);
    }

    this.form
      .get("endereco.cep")
      .valueChanges.pipe(
        tap((v) => console.log(v)),
        filter((value) => value.length === 8),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
        switchMap((value) => this.enderecoService.pesquisaPorCep(value))
      )
      .subscribe((response: any) => {
        console.log("response cep", response);
        this.form.get("endereco.logradouro").setValue(response.logradouro);
        this.form.get("endereco.complemento").setValue(response.complemento);
      });
  }

  private initForm() {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      tipoCliente: [null, Validators.required],
      cpfCnpj: [null],
      telefone: [null],
      email: [null],
      endereco: this.fb.group({
        cep: [null],
        bairro: [null],
        logradouro: [null],
        complemento: [null],
        numero: [null],
      }),
      ativo: [null],
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
          this.snackBarMessageService.openSnackbar(
            "Cliente salvo com sucesso!"
          );
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

  compareObjects(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
