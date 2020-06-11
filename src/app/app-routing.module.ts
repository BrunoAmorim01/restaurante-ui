import { Oauth2Guard } from "./seguranca/guards/oauth2.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    //path: '', pathMatch: 'full', redirectTo: 'produto'
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },

  {
    path: "login",
    loadChildren: () =>
      import("./seguranca/seguranca.module").then((m) => m.SegurancaModule),
  },

  {
    path: "cliente",
    canActivate: [Oauth2Guard],
    loadChildren: () =>
      import("./cliente/cliente.module").then((m) => m.ClienteModule),
  },

  {
    path: "produto",
    canActivate: [Oauth2Guard],
    loadChildren: () =>
      import("./produto/produto.module").then((m) => m.ProdutoModule),
  },

  {
    path: "pedido",
    canActivate: [Oauth2Guard],
    loadChildren: () =>
      import("./pedido/pedido.module").then((m) => m.PedidoModule),
  },
  /* 
  { path: 'categoria', 
  loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule),
  },*/
  {
    path: "logout",
    canActivate: [Oauth2Guard],
    loadChildren: () =>
      import("./seguranca/seguranca.module").then((m) => m.SegurancaModule),
  },
  {
    path: "dashboard",
    //canActivate: [Oauth2Guard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "relatorios",
    canActivate: [Oauth2Guard],
    loadChildren: () =>
      import("./relatorio/relatorio.module").then((m) => m.RelatorioModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
