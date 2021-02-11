import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registrationGoingOn : boolean;
  allowConnexion : boolean = true;
  tryConnexion : boolean;
  serverConnexionLost : boolean = false;
  usernameEnregistrated : String = "";
  isAuth : boolean = false;
  activeUserId : String;
  userToken : String;
  activeUser : User;

  constructor(private http : HttpClient, private jwtHelperService: JwtHelperService, private route : Router) {
  }

  postUser(user : User){
    const apiToCall = environment.apiUrl + "/add-user";
    this.http.post<any>(apiToCall, user).subscribe(response => {
      this.registrationGoingOn = false;
      this.usernameEnregistrated = user.getUsername();
      this.route.navigate(['/login']);
      console.log(response);
    }, error => {
      this.registrationGoingOn = false;
    });
  }

  login(username: String, password: String){
    const apiToCall = environment.apiUrl + "/signin";
    this.http.post<any>(apiToCall, {username: username, password: password}).subscribe(response => {
      this.serverConnexionLost = false;
      this.tryConnexion = false;
      if(!response.error){
        this.userToken = response.token;
        // decode token to read the payload details
        let decodeToken = this.jwtHelperService.decodeToken(response.token);
        console.log(decodeToken);

        // check if it was decoded successfully, if not the token is not valid, deny access
        if (!decodeToken) {
          return false;
        }
        this.activeUserId = decodeToken.userId;
        this.getActiveUser(this.activeUserId);
        this.isAuth = true;
        this.allowConnexion = true;
        this.route.navigate(['/contact']);
      }else{
        this.allowConnexion = false;
      }
    }, error => {
      this.tryConnexion = false;
      this.allowConnexion = false;
      this.serverConnexionLost = true;
    })
  }

  getActiveUser(id : String){
    const apiToCall = environment.apiUrl + "/user/"+ id;
    this.http.get<any>(apiToCall).subscribe(response => {
        let user = new User(response.name, response.username, response.phone, response.email, response.password);
        this.activeUser = user;
    })
  }

}
