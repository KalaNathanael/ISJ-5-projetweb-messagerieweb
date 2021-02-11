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
        // decode token to read the payload details
        let decodeToken = this.jwtHelperService.decodeToken(response.token);
        console.log(decodeToken);

        // check if it was decoded successfully, if not the token is not valid, deny access
        if (!decodeToken) {
          return false;
        }

        this.allowConnexion = true;
      }else{
        this.allowConnexion = false;
      }
    }, error => {
      this.tryConnexion = false;
      this.allowConnexion = false;
      this.serverConnexionLost = true;
    })
  }

}
