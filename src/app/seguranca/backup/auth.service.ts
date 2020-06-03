import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_PATH: 'http://localhost:8080/login/basicauth'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) { 

  }

  authenticationService(username: String, password: String) {
    console.log('authenticationService')
    return this.http.get<any>(`${environment.API}login/basicauth`,
      {
        headers:{
          authorization: this.createBasicAuthToken(username,password)
        },
        
      }).pipe(
        map((res) =>{          
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        })
      )
  }
  createBasicAuthToken(username: String, password: String) {
    console.log('createBasicAuthToken',window.btoa(username + ":" + password))
    return 'Basic ' + window.btoa(username + ":" + password)
    
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
  
  login(usuario:string, senha:string){

  }
  private carregarToken(){
    const token=localStorage.getItem('token');
    if(token){

    }
  }

  private armazenarToken(){
    //jwt
  }
}
