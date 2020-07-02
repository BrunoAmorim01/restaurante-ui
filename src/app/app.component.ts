import { Component, OnInit } from "@angular/core";
import { OAuthService, AuthConfig } from "angular-oauth2-oidc";
import { JwksValidationHandler } from "angular-oauth2-oidc-jwks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "restaurante";
  isAuthenticated: boolean;

  constructor(private oauthService: OAuthService) {
    const config = new AuthConfig();

    //console.log(window.location.origin + "/index.html");
    //config.redirectUri = window.location.origin + '/dashboard';
    config.redirectUri = window.location.origin;
    config.clientId='0oa5keo3rAsIOibGw4x6'
    //config.clientId = "restaurante";
    config.scope = "openid profile email offline_access";
    config.issuer='https://dev-590029.okta.com/oauth2/default'
    //config.issuer = "http://localhost:8180/auth/realms/dev";
    //config.dummyClientSecret = "6711f75d-6871-4bde-8b6d-a585e0942674";

    config.responseType = "code";
    config.showDebugInformation = true;

    oauthService.tokenValidationHandler = new JwksValidationHandler();

    oauthService.configure(config);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndTryLogin();
    //config.disablePKCE = true;
  }
}
