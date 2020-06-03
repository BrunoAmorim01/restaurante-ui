import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { MessagesService } from './../../shared/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form:FormGroup;
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(private fb: FormBuilder,
              private msgService: MessagesService, 
              private authService: AuthService ,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              ){ }

  ngOnInit(): void {
    //sessionStorage.setItem('token','');
    this.form= this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      senha:[null,[Validators.required]]
    })

  }

  handleLogin() {
    //this.router.navigate(['produto']);
    
    console.log('user',this.form.value.email)
    this.authService.authenticationService(this.form.value.email, this.form.value.senha).subscribe(
      (result)=> {
        console.log('login sucesso',result)
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['produto']);
    }, 
      (error) => {
        console.error('login erro',error)
      this.invalidLogin = true;
      this.loginSuccess = false;
    });   
  }


  onSubmit(){
    let url = 'http://localhost:8080/login';
    this.http.post<Observable<boolean>>(url, {
      userName: this.form.value.email,
      password: this.form.value.senha,
  }).subscribe(isValid => {
    
      if (isValid) {
        console.log('logado',isValid)
          sessionStorage.setItem(
            'token', 
            btoa(this.form.value.email + ':' + this.form.value.senha)
          );
      this.router.navigate(['/produto']);
      } else {
          alert("Authentication failed.")
      }
  },
  error=>{
    console.error('erro ao logar',error)
  }
  );
  }

  login(){

  }

  MostrarMsgErroControl(control: string) {
    return this.msgService.sendMessageErrorFormControl(this.form.get(control));
  }

}
