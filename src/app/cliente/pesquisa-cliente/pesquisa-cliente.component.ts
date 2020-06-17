import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Cliente } from "../model/cliente";
import { ClienteService } from "../service/cliente.service";
import { ErrorHandlerService } from "src/app/seguranca/error-handler.service";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";

@Component({
  selector: "app-pesquisa-cliente",
  templateUrl: "./pesquisa-cliente.component.html",
  styleUrls: ["./pesquisa-cliente.component.scss"],
})
export class PesquisaClienteComponent implements OnInit {
  form: FormGroup;
  isLoadingResults: boolean = false;
  displayedColumns: string[] = [
    "nome",
    "cpfCnpj",
    "telefone",
    "localizacao",
    "opcoes",
  ];
  dataSource = new MatTableDataSource<Cliente>();
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null],
    });
    this.configPaginator();
  }

  private configPaginator() {
    const i: MatPaginatorIntl = new MatPaginatorIntl();
    i.itemsPerPageLabel = "Itens por página";
    this.paginator._intl = i;
    this.paginator.showFirstLastButtons = true;
    this.paginator.pageSizeOptions = [5, 10, 15];
  }

  onSubmit() {
    console.log(this.form.value)
    const nome = this.form.get("nome").value;
    const pagina = 1;
    const itensPorPagina = this.paginator.pageSize;

    this.clienteService
      .listFilter(nome, pagina, itensPorPagina)
      .subscribe((res:any) => {
        console.log(res)
        this.dataSource.data = res.content;
        this.paginator.length = res.totalElements;
        this.paginator.firstPage();
      });
  }
}
