import { Component, OnInit } from "@angular/core";
import {
  map,
  delay,
  last,
  switchMap,
  concatAll,
  flatMap,
  tap,
} from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { DashboardService } from "./service/dashboard.service";
import { Dashboard } from "./model/dashboard";
import { concat, Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  dashboard = new Dashboard();
  cards;
  media$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    dashboardService: DashboardService
  ) {
    this.cards = dashboardService.getMediaValorTotalPedidos().pipe(
      tap((value) => {
        this.dashboard.mediaValorTotalPedidos = value;
      }),
      switchMap(() => dashboardService.getRankingProdutos()),
      tap((value: Object[]) => {
        this.dashboard.rankingProdutos = value;
      }),
      switchMap(() => dashboardService.getValorTotalPedidos()),
      tap((value) => {
        this.dashboard.valorTotalPedidos = value;
      }),
      switchMap(() => cards$)
    );
    /*
      .subscribe((data) => {
        this.dashboard.mediaValorTotalPedidos = data;
      });*/

    var cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            {
              title: "Media Valor total mes atual",
              cols: 1,
              rows: 1,
              tipo: "dinheiro",
              data: this.dashboard.mediaValorTotalPedidos,
            },
            {
              title: "Ranking produtos",
              cols: 1,
              rows: 1,
              tipo: "grafico",
              data: JSON.stringify(this.dashboard.rankingProdutos),
            },
            {
              title: "Valor total dos pedidos",
              cols: 1,
              rows: 1,
              tipo: "dinheiro",
              data: this.dashboard.valorTotalPedidos,
            },
            { title: "Card 4", cols: 1, rows: 1 },
          ];
        }

        return [
          {
            title: "Card 1",
            cols: 2,
            rows: 1,
            data: this.dashboard.mediaValorTotalPedidos,
          },
          {
            title: "Ranking produtos",
            cols: 1,
            rows: 1,
            data: this.dashboard.rankingProdutos,
          },
          {
            title: "Valor total dos pedidos",
            cols: 1,
            rows: 2,
            data: this.dashboard.valorTotalPedidos,
          },
          { title: "Card 4", cols: 1, rows: 1 },
        ];
      })
    );
  }

  ngOnInit(): void {
    console.log("init");
    console.log("model3", this.dashboard.mediaValorTotalPedidos);
  }
}
