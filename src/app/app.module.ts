import { SegurancaModule } from "./seguranca/seguranca.module";
import { TemplateModule } from "./template/template.module";
import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeBr from "@angular/common/locales/pt";
import localeBrExtra from "@angular/common/locales/extra/br";
import { OAuthModule } from "angular-oauth2-oidc";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from 'src/environments/environment';

// export const options: Partial<IConfig> | (() => Partial<IConfig>);
registerLocaleData(localeBr, "pt", localeBrExtra);
@NgModule({
  declarations: [AppComponent],
  imports: [
    SegurancaModule,
    BrowserModule,
    BrowserAnimationsModule,
    TemplateModule,
    SharedModule,
    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.API],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "BRL" },
    /*
   {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorTestService,
      multi: true,
    }
    */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
