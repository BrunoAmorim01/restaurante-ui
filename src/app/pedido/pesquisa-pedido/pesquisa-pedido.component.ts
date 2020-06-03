import { ErrorHandlerService } from "./../../seguranca/error-handler.service";
import { StatusPedido } from "./../model/status-pedido.enum";
import { delay, tap } from "rxjs/operators";
import { PedidoService } from "./../service/pedido.service";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, Subscription, Subject } from "rxjs";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Pedido } from "../model/pedido";
import { PedidoFilter } from "../filter/pedido-filter";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { switchMap, takeUntil } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-pesquisa-pedido",
  templateUrl: "./pesquisa-pedido.component.html",
  styleUrls: ["./pesquisa-pedido.component.scss"],
})
export class PesquisaPedidoComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  form: FormGroup;
  //pedidos$: Observable<Pedido[]>;
  paginator$: Subscription;
  statusPedido: string[] = Object.keys(StatusPedido);
  isLoadingResults: boolean = false;

  displayedColumns: string[] = [
    "codigo",
    "dataCriacao",
    "statusPedido",
    "total",
    "opcoes",
  ];
  dataSource = new MatTableDataSource<Pedido>();
  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private errorHandlerService: ErrorHandlerService
  ) {}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.form = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
      statusPedido: this.fb.array([]),
    });
    this.configPaginator();
    this.dataSource.sort = this.sort;
  }

  private configPaginator() {
    const i: MatPaginatorIntl = new MatPaginatorIntl();
    i.itemsPerPageLabel = "Itens por página";
    this.paginator._intl = i;
    this.paginator.showFirstLastButtons = true;
    this.paginator.pageSizeOptions = [5, 10, 15];
  }

  onSubmit() {
    const filter = new PedidoFilter();
    filter.dataInicio = this.form.controls.dataInicio.value;
    filter.dataFim = this.form.controls.dataFim.value;
    filter.statusPedido = this.form.controls.statusPedido.value;

    this.pedidoService
      .listFilter(filter)
      .pipe(
        delay(500),
        tap(() => (this.isLoadingResults = true))
      )
      .subscribe(
        (res) => {
          console.log("onSubmit", res);
          this.dataSource.data = res.content;
          this.paginator.length = res.totalElements;
          this.paginator.firstPage();
          this.isLoadingResults = false;
        },
        (err) => {
          this.errorHandlerService.handle(err);
          console.error("errro list filter", err);
          this.isLoadingResults = false;
        }
      );

    this.paginator$ = this.paginator.page
      .pipe(
        switchMap((p) => {
          this.isLoadingResults = true;
          filter.pagina = p.pageIndex;
          filter.itensPorPagina = p.pageSize;
          return this.pedidoService.listFilter(filter);
        }),
        delay(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (res) => {
          this.dataSource.data = res.content;
          this.isLoadingResults = false;
        },
        (err) => {
          this.errorHandlerService.handle(err);
          console.error(err);
        }
      );
  }

  onChangeCheckBox(event: MatCheckboxChange) {
    const statusArray: FormArray = this.form.get("statusPedido") as FormArray;

    if (event.checked) {
      statusArray.push(new FormControl(event.source.value));
    } else {
      const index = statusArray.controls.findIndex(
        (s) => s.value === event.source.value
      );
      statusArray.removeAt(index);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
