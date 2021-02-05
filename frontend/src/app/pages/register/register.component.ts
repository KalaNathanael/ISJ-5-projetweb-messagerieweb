import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
