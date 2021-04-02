import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl();
  pwd = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  validate(){
    alert(this.username.value  + " "+ this.pwd.value);
  }
}
