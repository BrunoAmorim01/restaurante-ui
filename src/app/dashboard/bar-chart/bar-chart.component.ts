import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit, OnDestroy {
  @Input() data: Array<any>;
  chart$: Subscription;
  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 6.5,
    maintainAspectRatio: true,
  };
  public barChartLabels: Label[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.chart$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(({ matches }) => {
          if (matches) {
            return 2;
          }
          return 6.5;
        })
      )
      .subscribe((result) => {
        this.barChartOptions.aspectRatio = result;
      });

    this.barChartLabels = [];
    this.barChartData = [];
    let data1: Array<any> = [];
    this.data.forEach((data) => {
      this.barChartLabels.push(data.nome);
      data1.push(data.vezes);
    });
    this.barChartData = [{ data: data1, label: "Produtos" }];
  }

  ngOnDestroy(): void {
    this.chart$.unsubscribe();
  }
}
