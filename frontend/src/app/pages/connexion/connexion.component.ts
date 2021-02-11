import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  focus;
  focus1;
  signForm : FormGroup;
  constructor(private formBuilder : FormBuilder, public userService : UserService) { 

  }

  ngOnInit(): void {
    this.initForm(this.userService.usernameEnregistrated);
  }

  initForm(username : String){
    this.signForm = this.formBuilder.group({
      username : [username, Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit(){
    this.userService.tryConnexion = true;
    this.userService.login(this.signForm.value['username'], this.signForm.value['password'])
  }

}
