import { take } from "rxjs/operators";
import { AuthServiceTest } from "./../auth.service-test";
import { ErrorHandlerService } from "./../../shared/error-handler.service";
import { error } from "@angular/compiler/src/util";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "./../auth.service";
import { MessagesService } from "./../../shared/messages.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private msgService: MessagesService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private authService2: AuthServiceTest,
    private router: Router,
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    //window.sessionStorage.removeItem("token");
    //sessionStorage.setItem('token','');
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
    });
  }

  login() {
    const email = this.form.value.email;
    const senha = this.form.value.senha;
    const a = this.authService.login(email, senha).subscribe(
      (response) => {
        console.log("login realizado com sucesso", response);
        //this.authService.armazenarToken(response.access_token)
        this.router.navigate(["/produto"]);
      },

      (error) => {
        console.error("login error", error);
        this.errorHandler.handle(error);
      }
    );
  }

  login2() {
    if (this.form.invalid) {
      return;
    }

    const body = new HttpParams()
      .set("username", this.form.controls.email.value)
      .set("password", this.form.controls.senha.value)
    this.authService2
      .login(body)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log("sucesso login", data);
          //window.sessionStorage.setItem('token', JSON.stringify(data));
          //console.log(window.sessionStorage.getItem('token'));
          //this.authService2.armazenarToken(data.access_token);
          this.authService2.armazenarToken(data);
          // console.log(localStorage.getItem('token'));
          this.router.navigate(["produto"]);
        },
        (error) => {
          console.error("error login", error);
          this.errorHandler.handle(error);
        }
      );
  }

  login3(){
    this.oauthService.initCodeFlow();
    //this.oauthService.initImplicitFlow();
    //this.oauthService.initLoginFlow();
  }

  MostrarMsgErroControl(control: string) {
    return this.msgService.sendMessageErrorFormControl(this.form.get(control));
  }
}
