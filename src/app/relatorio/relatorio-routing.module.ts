import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos/pedidos.component';


const routes: Routes = [
  { path: "", component: PedidosComponent },
  { path: "pedidos", component: PedidosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
