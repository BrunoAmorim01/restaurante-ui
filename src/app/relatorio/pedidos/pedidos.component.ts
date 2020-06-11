import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
      dataInicio: [null,Validators.required],
      dataFim: [null, Validators.required],
    });
  }

  onSubmit() {
    if(this.form.valid)    
    this.relatorioService
      .pedidosPorData(
        this.form.controls.dataInicio.value,
        this.form.controls.dataFim.value
      )
      .pipe(
        pipe(take(1)),
        catchError((err) => {
          this.errorHandlerService.handle(err);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.arquivoService.handleFile(res, "relatorio.pdf");
      });
  }
}
