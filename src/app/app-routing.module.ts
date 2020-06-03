import { Oauth2Guard } from "./seguranca/guards/oauth2.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./seguranca/login-form/login-form.component";
import { AuthGuard } from "./seguranca/guards/auth.guard";

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
    loadChildren: () =>
      import("./seguranca/seguranca.module").then((m) => m.SegurancaModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
