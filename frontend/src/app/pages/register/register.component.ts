import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  userForm : FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      name : ['', Validators.required],
      username : ['', Validators.required],
      phone : [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required, Validators.minLength(4)]
    });
  }

  onSubmit(){
    console.log(this.userForm);
  }

}
