import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroClienteComponent } from "./cadastro-cliente/cadastro-cliente.component";
import { ClienteResolverGuard } from "./guards/cliente-resolver.guard";
import { PesquisaClienteComponent } from "./pesquisa-cliente/pesquisa-cliente.component";

const routes: Routes = [
  { path: "", component: CadastroClienteComponent },
  { path: "novo", component: CadastroClienteComponent },
  { path: "pesquisa", component: PesquisaClienteComponent },
  {
    path: ":id",
    resolve: { cliente: ClienteResolverGuard },
    component: CadastroClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
