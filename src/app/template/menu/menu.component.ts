import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { OAuthService, OAuthErrorEvent } from "angular-oauth2-oidc";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  isLoggedIn = false;
  mobileQuery: MediaQueryList;
  claim;
  nomeUsuario;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  events;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    //this.isLoggedIn = this.authService.isUserLoggedIn();
    this.events = this.oauthService.events.subscribe((event) => {
      if (event.type === "token_received") {
        console.log("token recebido");
        this.claim = this.oauthService.getIdentityClaims();
        this.nomeUsuario = this.claim.name;
        this.isLoggedIn = true;
        //console.log(this.oauthService.loadUserProfile());
      }

      if (event.type === "logout") {
        this.isLoggedIn = false;
        this.nomeUsuario = null;
      }
      /*
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
      */
    });
    if (this.oauthService.hasValidIdToken) {
      const claim: any = this.oauthService.getIdentityClaims();
      this.nomeUsuario = claim.name;
      this.isLoggedIn = true;
    }
    console.log("menu ->" + this.isLoggedIn);
  }

  handleLogout() {
    //this.authService.logout();
    //this.authService.logout().pipe(take(1)).subscribe()
    this.oauthService.logOut();
  }

  handleLogin() {
    this.oauthService.initCodeFlow();
  }

  usuarioLogado() {}
}
