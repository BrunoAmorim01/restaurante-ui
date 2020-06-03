import { PedidoResolverGuard } from "./guards/pedido-resolver.guard";
import { PesquisaPedidoComponent } from "./pesquisa-pedido/pesquisa-pedido.component";
import { CadastroPedidoComponent } from "./cadastro-pedido/cadastro-pedido.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Oauth2Guard } from '../seguranca/guards/oauth2.guard';

const routes: Routes = [
  { path: "", component: CadastroPedidoComponent },
  { path: "novo", component: CadastroPedidoComponent},
  { path: "pesquisa", component: PesquisaPedidoComponent},
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
