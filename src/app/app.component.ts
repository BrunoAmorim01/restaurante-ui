import { Component } from "@angular/core";
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
    //config.redirectUri = window.location.origin + '/dashboard';
    //config.clientId = "restaurante";
    //config.issuer = "http://localhost:8180/auth/realms/dev";
    //config.dummyClientSecret = "keycloaksecret";

    config.redirectUri = window.location.origin;
    config.clientId = "0oa5keo3rAsIOibGw4x6";
    config.scope = "openid profile email offline_access";
    config.issuer = "https://dev-590029.okta.com/oauth2/default";
    config.responseType = "code";
    config.showDebugInformation = true;

    oauthService.tokenValidationHandler = new JwksValidationHandler();

    oauthService.configure(config);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin();
    //oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
