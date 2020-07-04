import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { MenuComponent } from "./menu/menu.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatButtonModule
  ],
  exports: [MenuComponent],
})
export class TemplateModule {}
