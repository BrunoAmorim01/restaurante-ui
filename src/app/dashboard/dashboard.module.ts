import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DashboardComponent } from './dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [DashboardComponent,BarChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,    
    MatMenuModule,
    MatIconModule,    
    LayoutModule    
  ],
  exports:[
    BarChartComponent
  ]
})
export class DashboardModule { }
