import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RelatorioService } from "../relatorio.service";
import { ErrorHandlerService } from "src/app/seguranca/error-handler.service";
import { catchError, take } from "rxjs/operators";
import { EMPTY, pipe } from "rxjs";
import { ArquivoService } from "src/app/shared/arquivo.service";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.component.html",
  styleUrls: ["./pedidos.component.scss"],
})
export class PedidosComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private relatorioService: RelatorioService,
    private errorHandlerService: ErrorHandlerService,
    private arquivoService: ArquivoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
    });
  }

  onSubmit() {
    this.relatorioService
      .pedidosPorData()
      .pipe(
        pipe(take(1)),
        catchError((err) => {
          this.errorHandlerService.handle(err);
          return EMPTY;
        })
      )
      .subscribe((res) => {        
        this.arquivoService.handleFile(res, "report.pdf");
      });
  }
}
