import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root",
})
export class Oauth2Guard implements CanActivate {
  constructor(private oauthService: OAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //console.debug("claim", this.oauthService.getIdentityClaims());
    //console.debug("scopes", this.oauthService.getGrantedScopes());

    return this.tokenValido();
  }
  
  private tokenValido() {
    var hasIdToken = this.oauthService.hasValidIdToken();
    var hasAccessToken = this.oauthService.hasValidAccessToken();

    return hasIdToken && hasAccessToken;
  }
}
