import { SegurancaModule } from './seguranca/seguranca.module';
import { TemplateModule } from './template/template.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import localeBrExtra from '@angular/common/locales/extra/br';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';


//export const options: Partial<IConfig> | (() => Partial<IConfig>);
registerLocaleData(localeBr,'pt',localeBrExtra)
@NgModule({
  declarations: [
    AppComponent
            
  ],
  imports: [
    SegurancaModule ,
    BrowserModule,
    BrowserAnimationsModule,
    TemplateModule,    
    SharedModule,    
    AppRoutingModule ,
    OAuthModule.forRoot({
      resourceServer:{
        allowedUrls:['http://localhost:8080/'],
        sendAccessToken:true        
      }
    })
    
    //DashboardModule
    //HttpClientModule
    
  ],
  providers: [
    {provide:LOCALE_ID, useValue: "pt"},
    {provide:DEFAULT_CURRENCY_CODE, useValue:"BRL"}
   /* 
   {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorTestService,
      multi: true,      
    }
    */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
