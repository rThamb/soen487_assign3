import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl();
  pwd = new FormControl();

  constructor(private router : Router, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.goToHome();
    }
  }

  validate(){
    this.auth.validateCredentials(this.username.value, this.pwd.value).subscribe(
      valid => {
        if(valid){

          this.goToHome();
        }else{
          alert("Failed Login");
        }
    });
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
