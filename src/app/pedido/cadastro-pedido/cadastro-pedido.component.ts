import { MatSort } from '@angular/material/sort';
import { SnackBarMessageService } from './../../shared/snack-bar-message.service';
import { ErrorHandlerService } from './../../seguranca/error-handler.service';

import { ActivatedRoute } from '@angular/router';
import { PedidoService } from './../service/pedido.service';
import { MatTable } from '@angular/material/table';
import { ItemPedido } from './../model/item-pedido';
import { ArquivoService } from './../../shared/arquivo.service';
import { ProdutoService } from './../../produto/service/produto.service';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  catchError,
} from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Produto } from './../../produto/model/Produto';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subject, empty, EMPTY } from 'rxjs';
import { Pedido } from '../model/pedido';
import { StatusPedido } from '../model/status-pedido.enum';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.scss'],
})
export class CadastroPedidoComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  form: FormGroup;
  pedido: Pedido;
  produtoAutoComplete = new FormControl();
  produtos: Produto[];
  produtosFiltrados$: Observable<Produto[]>;
  displayedColumns: string[] = [
    'codigo',
    'produto',
    'quantidade',
    'valorUnitario',
    'subtotal',
    'opcoes',
  ];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private arquivoService: ArquivoService,
    private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService,
    private snackBarMessageService: SnackBarMessageService
  ) {}

  ngOnInit(): void {
    const formArray: FormArray = this.fb.array([], [Validators.required]);

    this.pedido = this.activatedRoute.snapshot.data.pedido;

    if (this.pedido === undefined || this.pedido === null) {
      this.pedido = new Pedido();
    } else {
      this.pedido.itens.forEach((i) => {
        formArray.push(new FormControl(i));
      });
    }

    this.form = this.fb.group({
      id: [this.pedido.id],
      itens: formArray,
      total: [this.pedido.total, [Validators.min(0.01)]],
      desconto: [this.pedido.desconto, [Validators.min(0.0)]],
      observacao: [this.pedido.observacao],
      statusPedido: [this.pedido.statusPedido, [Validators.required]],
      dataCriacao: [this.pedido.dataCriacao],
    });

    this.form.controls.desconto.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.calcularTotal());

    this.produtosFiltrados$ = this.produtoAutoComplete.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.produtoService.porNome(value)),
      /*
      tap(() => {
        if (this.form.controls.itens.value === null) {
          this.form.controls.itens.setValue([]);
        }
      }),*/
      catchError((err) => {
        this.errorHandlerService.handle(err);
        return EMPTY;
      })
    );
  }

  produtoSelecionado(produto) {
    const itemPedido = new ItemPedido();
    itemPedido.produto = produto;
    itemPedido.quantidade = 1;
    itemPedido.valorUnitario = produto.preco;
    const formArrayItens: FormArray = this.form.get('itens') as FormArray;
    formArrayItens.push(new FormControl(itemPedido));

    // this.form.controls.itens.value.push(itemPedido);
    this.table.renderRows();

    this.produtoAutoComplete.patchValue('');
    this.calcularTotal(formArrayItens);
  }

  showFile(nomeArquivo: string) {
    return this.arquivoService.getUrl(nomeArquivo);
  }

  updateTable(event, rowObj) {
    const formArrayItens: FormArray = this.form.get('itens') as FormArray;
    formArrayItens.controls.forEach((i) => {
      if (i.value.produto.id === rowObj.produto.id) {
        i.value.quantidade = event.target.value;
        // .patchValue({'quantidade': event.target.value})
      }
    });

    /*
    this.form.controls.itens.value.filter((value) => {
      if (value.produto.id == row_obj.produto.id) {
        value.quantidade = event.target.value;
      }
      return true;
    });*/
    this.calcularTotal(formArrayItens);
  }

  deleteRowTable(rowObj: FormControl) {
    const formArrayItens: FormArray = this.form.get('itens') as FormArray;

    const index = formArrayItens.controls.findIndex((i) => i.value === rowObj);
    // const index = this.form.controls.itens.value.indexOf(row_obj);
    // formArrayItens.controls.splice(index, 1);
    formArrayItens.removeAt(index);
    // this.form.controls.itens.value.splice(index, 1);

    this.table.renderRows();
    this.calcularTotal(formArrayItens);
  }

  calcularTotal(formArrayItens?: FormArray) {
    if (!formArrayItens) {
      formArrayItens = this.form.get('itens') as FormArray;
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
    console.log('evento selecionado', event);
  }

  onSubmit() {
    if (this.form.valid) {
      const pedido: Pedido = this.form.value;
      /*
      if (!pedido.dataCriacao) {
        pedido.dataCriacao = new Date();
      }*/

      this.pedidoService
        .salvar(pedido)
        .subscribe(
          (response: Pedido) => {
            if (!this.form.controls.dataCriacao.value) {
              console.log('if salvar');
              this.form.controls.dataCriacao.patchValue(
                response.dataCriacao
              );
            }
            this.snackBarMessageService.openSnackbar(
              'Pedido salvo com sucesso!'
            );
            console.log('Sucesso pedido', response);
          },
          (err) => {
            this.errorHandlerService.handle(err);
            console.error('Erro pedido', err);
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
          'Pedido concluido com sucesso!'
        );
        console.log('Pedido Concluido', response);
      });
  }

  onCancelarPedido() {
    this.pedidoService
      .cancelarPedido(this.form.controls.id.value)
      .subscribe((response) => {
        this.form.controls.statusPedido.setValue(StatusPedido.CANCELADO);
        this.snackBarMessageService.openSnackbar(
          'Pedido cancelado com sucesso!'
        );
        console.log('Pedido Cancelado', response);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
