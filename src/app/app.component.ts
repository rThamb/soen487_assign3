import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soen487-assign3';

  constructor(private auth: AuthService, private router : Router){}

  showLogOut(): boolean{
    return this.auth.isLoggedIn();
  }

  goToLeaderboard(){
      this.router.navigate(['/rank']);
  }

  goHome(){
      this.router.navigate(['/home']);
  }

  logout(){
    if(this.auth.isLoggedIn()){
      this.auth.logout().subscribe( logOutSuccess => {
        if(logOutSuccess){
          this.router.navigate(['/login']);
        }
        else{
          alert("Failed to logout");
        }
      });
      
    }
  }
}
