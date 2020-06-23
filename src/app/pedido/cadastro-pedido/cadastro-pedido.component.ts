import { MatTable } from "@angular/material/table";
import { ItemPedido } from "./../model/item-pedido";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  catchError,
} from "rxjs/operators";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Subject, EMPTY, Observable } from "rxjs";
import { Pedido } from "../model/pedido";
import { StatusPedido } from "../model/status-pedido.enum";
import { Produto } from "src/app/produto/model/Produto";
import { ProdutoService } from "src/app/produto/service/produto.service";
import { ArquivoService } from "src/app/shared/arquivo.service";
import { ActivatedRoute } from "@angular/router";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { SnackBarMessageService } from "src/app/shared/snack-bar-message.service";
import { PedidoService } from "../service/pedido.service";
import { Cliente } from "src/app/cliente/model/cliente";
import { ClienteService } from "src/app/cliente/service/cliente.service";
import { EmailService } from '../service/email.service';

@Component({
  selector: "app-cadastro-pedido",
  templateUrl: "./cadastro-pedido.component.html",
  styleUrls: ["./cadastro-pedido.component.scss"],
})
export class CadastroPedidoComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  form: FormGroup;
  pedido: Pedido;
  produtoAutoComplete = new FormControl();
  produtos: Produto[];
  produtosFiltrados$: Observable<Produto[]>;
  clientesFiltrados$: Observable<Cliente[]>;
  displayedColumns: string[] = [
    "codigo",
    "produto",
    "quantidade",
    "valorUnitario",
    "subtotal",
    "opcoes",
  ];

  @ViewChild(MatTable, { static: true }) table: MatTable<ItemPedido>;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private arquivoService: ArquivoService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService,
    private snackBarMessageService: SnackBarMessageService,
    private emailService:EmailService
  ) {}

  ngOnInit(): void {
    const itensFormArray: FormArray = this.fb.array([], [Validators.required]);

    this.pedido = this.activatedRoute.snapshot.data.pedido;

    if (this.pedido === undefined || this.pedido === null) {
      this.pedido = new Pedido();
    } else {
      this.pedido.itens.forEach((i) => {
        itensFormArray.push(new FormControl(i));
      });
    }

    this.form = this.fb.group({
      id: [this.pedido.id],
      itens: itensFormArray,
      total: [this.pedido.total, [Validators.min(0.01)]],
      desconto: [this.pedido.desconto, [Validators.min(0.0)]],
      observacao: [this.pedido.observacao],
      statusPedido: [this.pedido.statusPedido, [Validators.required]],
      dataCriacao: [this.pedido.dataCriacao],
      cliente: [this.pedido.cliente],
      username: [{ value: this.pedido.username, disabled: true }],
    });

    this.form.controls.desconto.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.calcularTotal());

    this.produtosFiltrados$ = this.produtoAutoComplete.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$),
      switchMap((value) => this.produtoService.porNome(value)),
      catchError((err) => {
        this.errorHandlerService.handle(err);
        return EMPTY;
      })
    );

    this.clientesFiltrados$ = this.form.controls["cliente"].valueChanges.pipe(
      filter((value) => value.length > 3),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$),
      switchMap((value) => this.clienteService.porNome(value)),
      catchError((err) => {
        this.errorHandlerService.handle(err);
        return EMPTY;
      })
    );
  }

  produtoSelecionado(produto: Produto) {
    const itemPedido = new ItemPedido();
    itemPedido.produto = produto;
    itemPedido.quantidade = 1;
    itemPedido.valorUnitario = produto.preco;
    const formArrayItens: FormArray = this.form.get("itens") as FormArray;
    formArrayItens.push(new FormControl(itemPedido));

    this.table.renderRows();

    this.produtoAutoComplete.patchValue("");
    this.calcularTotal(formArrayItens);
  }

  showFile(nomeArquivo: string) {
    return this.arquivoService.getUrl(nomeArquivo);
  }

  updateTable(event, rowObj) {
    const formArrayItens: FormArray = this.form.get("itens") as FormArray;
    formArrayItens.controls.forEach((i) => {
      if (i.value.produto.id === rowObj.produto.id) {
        i.value.quantidade = event.target.value;        
      }
    });
    
    this.calcularTotal(formArrayItens);
  }

  deleteRowTable(rowObj: FormControl) {
    const formArrayItens: FormArray = this.form.get("itens") as FormArray;

    const index = formArrayItens.controls.findIndex((i) => i.value === rowObj);    
    formArrayItens.removeAt(index);   

    this.table.renderRows();
    this.calcularTotal(formArrayItens);
  }

  calcularTotal(formArrayItens?: FormArray) {
    if (!formArrayItens) {
      formArrayItens = this.form.get("itens") as FormArray;
    }

    let total = 0;
    if (formArrayItens.length > 0) {
      formArrayItens.controls.forEach((c) => {
        total += c.value.quantidade * c.value.produto.preco;
      });
    }

    total -= Number.parseFloat(this.form.controls.desconto.value);
    total.toFixed(2);
    this.form.controls.total.patchValue(total);
  }

  evento(event) {
    console.log("evento selecionado", event);
  }

  onSubmit() {
    if (this.form.valid) {
      const pedido: Pedido = this.form.value;     

      this.pedidoService.salvar(pedido).subscribe(
        (response: Pedido) => {
          if (!this.form.controls.dataCriacao.value) {
            this.form.controls.dataCriacao.patchValue(response.dataCriacao);
          }
          this.snackBarMessageService.openSnackbar("Pedido salvo com sucesso!");
          console.log("Sucesso pedido", response);
        },
        (err) => {
          this.errorHandlerService.handle(err);
          console.error("Erro pedido", err);
        }
      );
    }
  }

  onConcluirPedido() {
    this.pedidoService
      .concluirPedido(this.form.controls.id.value)
      .subscribe((response) => {
        this.form.controls.statusPedido.setValue(StatusPedido.CONCLUIDO);
        this.snackBarMessageService.openSnackbar(
          "Pedido concluido com sucesso!"
        );
        console.log("Pedido Concluido", response);
      }),
      (err) => {
        this.errorHandlerService.handle(err);
      };
  }

  onCancelarPedido() {
    this.pedidoService
      .cancelarPedido(this.form.controls.id.value)
      .subscribe((response) => {
        this.form.controls.statusPedido.setValue(StatusPedido.CANCELADO);
        this.snackBarMessageService.openSnackbar(
          "Pedido cancelado com sucesso!"
        );
        console.log("Pedido Cancelado", response);
      }),
      (err) => {
        this.errorHandlerService.handle(err);
      };
  }

  displayFn(cliente: Cliente): string {
    return cliente && cliente.nome ? cliente.nome : "";
  }

  mostrarBtnCancelar() {
    return (
      this.form.controls["statusPedido"].value === StatusPedido.ABERTO &&
      this.form.controls["id"].value != null
    );
  }

  mostrarBtnConcluir() {
    return (
      this.form.controls["statusPedido"].value === StatusPedido.ABERTO &&
      this.form.controls["id"].value != null &&
      this.form.controls["total"].value > 0
    );
  }

  enviarEmail(){
    this.emailService.enviarPedido(this.form.controls['id'].value).subscribe(
      response=>{
        this.snackBarMessageService.openSnackbar('Email enviado com sucesso')
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
