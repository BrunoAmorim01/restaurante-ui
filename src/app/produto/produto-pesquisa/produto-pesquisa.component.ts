import { ArquivoService } from "./../../shared/arquivo.service";
import { ModalMessageService } from "./../../shared/modal-message.service";
import { ErrorHandlerService } from "./../../shared/error-handler.service";
import { SnackBarMessageService } from "./../../shared/snack-bar-message.service";
import { CategoriaService } from "./../service/categoria.service";
import { Observable, empty, Subject } from "rxjs";
import { ProdutoService } from "./../service/produto.service";
import { Categoria } from "./../model/Categoria";
import { Produto } from "./../model/Produto";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { catchError, tap, switchMap, delay, takeUntil } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

export class ProdutoFilter {
  constructor() {
    (this.pagina = 0), (this.itensPorPagina = 5);
  }
  nome: string;
  categoria: Categoria;
  pagina: number;
  itensPorPagina: number;
}
@Component({
  selector: "app-produto-pesquisa",
  templateUrl: "./produto-pesquisa.component.html",
  styleUrls: ["./produto-pesquisa.component.scss"],
})
export class ProdutoPesquisaComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  form: FormGroup;
  filter: ProdutoFilter = new ProdutoFilter();
  categorias$: Observable<Categoria[]>;
  isLoadingResults: boolean = false;
  displayedColumns: string[] = [
    "Imagem",
    "codigo",
    "nome",
    "categoria",
    "preco",
    "status",
    "opcoes",
  ];

  dataSource = new MatTableDataSource<Produto>();

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService,
    private modalMessageService: ModalMessageService,
    private snackBarMessageService: SnackBarMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private arquivoService: ArquivoService
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null],
      categoria: [null],
    });

    this.carregarCategorias();
    this.dataSource.sort = this.sort;
    this.configPaginator();
    this.initPaginator();
  }

  private initPaginator() {
    this.paginator.page
      .pipe(
        switchMap((p) => {
          this.filter.pagina = p.pageIndex;
          this.filter.itensPorPagina = p.pageSize;
          this.isLoadingResults = true;
          return this.produtoService.listFilter(this.filter);
        }),
        delay(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (res) => {
          this.dataSource.data = res.content;
          this.isLoadingResults = false;
        },
        (error) => {
          console.error(error);
          this.errorHandlerService.handle(
            "Erro ao listar a pagina de produtos"
          );
        }
      );
  }

  private configPaginator() {
    const i: MatPaginatorIntl = new MatPaginatorIntl();
    i.itemsPerPageLabel = "Itens por página";

    this.paginator._intl = i;
    this.paginator.showFirstLastButtons = true;
    this.paginator.pageSizeOptions = [5, 10, 15];
  }

  carregarCategorias() {
    this.categorias$ = this.categoriaService.list().pipe(
      catchError((error) => {
        console.error(error);
        this.errorHandlerService.handle("Erro ao carregar a categoria");
        return empty();
      })
    );
  }
  onSubmit() {
    this.filter.categoria = this.form.value.categoria;
    this.filter.nome = this.form.value.nome;
    this.filter.pagina = this.paginator.pageIndex;
    this.filter.itensPorPagina = this.paginator.pageSize;

    this.produtoService
      .listFilter(this.filter)
      .pipe(tap((p) => (this.isLoadingResults = true)))
      .subscribe(
        (res) => {
          this.dataSource.data = res.content;
          this.paginator.length = res.totalElements;
          this.paginator.firstPage();
          this.isLoadingResults = false;
        },
        (error) => {
          console.error(error);
          this.errorHandlerService.handle(
            "Erro ao listar a pesquisa de produtos"
          );
        }
      );
  }

  onEdit(id) {
    this.router.navigate([id], { relativeTo: this.activatedRoute.parent });
  }

  onDelete(produto) {
    this.modalMessageService.deleteConfirmationModal(produto.nome);
    const c = this.modalMessageService.getModal();
    c.afterClosed()
      .pipe(
        switchMap((p) => {
          if (p) {
            //this.produtoService.deletar(produto.id);
            return this.produtoService.deletar(produto.id);
          } else {
            return empty();
          }
        }),
        catchError((error) => {
          console.error(error);
          this.errorHandlerService.handle(error);
          this.snackBarMessageService.openSnackbar("Erro ao excluir o produto");
          return empty();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((success) => {
        this.paginator.firstPage();
        this.snackBarMessageService.openSnackbar(
          "Produto deletado do sistema com sucesso!"
        );
      });
  }

  showFile(nomeArquivo: string) {
    return this.arquivoService.getUrl(nomeArquivo);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
