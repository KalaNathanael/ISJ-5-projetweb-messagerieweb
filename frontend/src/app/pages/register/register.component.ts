import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { doubleCheckPasswordValidator } from 'src/app/_validators/double-check-password-validor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  test : Date = new Date();
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  userForm : FormGroup;

  constructor(private formBuilder : FormBuilder, public userService : UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      name : ['', Validators.required],
      username : ['', Validators.required],
      phone : [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    }, { validators: doubleCheckPasswordValidator });
  }

  onSubmit(){
    this.userService.registrationGoingOn = true;
    let user = new User(this.userForm.value.name, this.userForm.value.username, this.userForm.value.phone, this.userForm.value.email, this.userForm.value.password);
    this.userService.postUser(user);
  }

}
