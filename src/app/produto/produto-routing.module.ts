import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProdutoCadastroComponent } from "./produto-cadastro/produto-cadastro.component";
import { ProdutoPesquisaComponent } from "./produto-pesquisa/produto-pesquisa.component";
import { ProdutoResolverGuard } from "./../produto/guards/produto-resolver.guard";

const routes: Routes = [
  { path: "", component: ProdutoCadastroComponent },
  { path: "novo", component: ProdutoCadastroComponent },
  { path: "pesquisa", component: ProdutoPesquisaComponent },
  {
    path: ":id",
    component: ProdutoCadastroComponent,
    resolve: { produto: ProdutoResolverGuard },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
