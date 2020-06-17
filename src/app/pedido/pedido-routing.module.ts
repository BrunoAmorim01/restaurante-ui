import { PedidoResolverGuard } from "./guards/pedido-resolver.guard";
import { PesquisaPedidoComponent } from "./pesquisa-pedido/pesquisa-pedido.component";
import { CadastroPedidoComponent } from "./cadastro-pedido/cadastro-pedido.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: CadastroPedidoComponent },
  { path: "novo", component: CadastroPedidoComponent },
  { path: "pesquisa", component: PesquisaPedidoComponent },
  {
    path: ":id",
    component: CadastroPedidoComponent,
    resolve: { pedido: PedidoResolverGuard },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
