import { Component, OnInit } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { DashboardService } from "./service/dashboard.service";
import { Dashboard } from "./model/dashboard";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboard = new Dashboard();
  cards;
  media$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.cards = this.dashboardService.getMediaValorTotalPedidos().pipe(
      tap((value) => {
        this.dashboard.mediaValorTotalPedidos = value;
      }),
      switchMap(() => this.dashboardService.getRankingProdutos()),
      tap((value: Object[]) => {
        this.dashboard.rankingProdutos = value;
      }),
      switchMap(() => this.dashboardService.getValorTotalPedidos()),
      tap((value) => {
        this.dashboard.valorTotalPedidos = value;
      }),
      switchMap(() => cards$)
    );  

    var cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            {
              title: "Media Valor total mês atual",
              cols: 2,
              rows: 1,
              tipo: "dinheiro",
              data: this.dashboard.mediaValorTotalPedidos,
            },
            {
              title: "Ranking produtos mês atual",
              cols: 2,
              rows: 1,
              tipo: "grafico",
              data: this.dashboard.rankingProdutos,
            },
            {
              title: "Valor total dos pedidos mês atual",
              cols: 2,
              rows: 1,
              tipo: "dinheiro",
              data: this.dashboard.valorTotalPedidos,
            },
            { title: "Card 4", cols: 1, rows: 1 },
          ];
        }
        return [
          {
            title: "Ranking produtos mês atual",
            cols: 2,
            rows: 1,
            tipo: "grafico",
            data: this.dashboard.rankingProdutos,
          },
          {
            title: "Media Valor total mês atual",
            cols: 1,
            rows: 1,
            tipo: "dinheiro",
            data: this.dashboard.mediaValorTotalPedidos,
          },
          {
            title: "Valor total dos pedidos mês atual",
            cols: 1,
            rows: 2,
            tipo: "dinheiro",
            data: this.dashboard.valorTotalPedidos,
          },
          { title: "Card 4", cols: 1, rows: 1 },
        ];
      })
    );
  }
}
