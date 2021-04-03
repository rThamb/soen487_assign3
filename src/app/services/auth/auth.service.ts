import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service'; 
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private storage: StorageService) {}

  validateCredentials(user: string, pwd: string): Observable<boolean>{
    
    if(user === 'Jim' && pwd === '123'){
      this.setAsLoggedIn(true);
      return of(true);
    }
    return of(false);
  }

  logout(){

    if(this.isLoggedIn()){
      this.setAsLoggedIn(false);
    }

  }

  isLoggedIn(): boolean{
    return this.storage.getProperty(this.storage.authKey) == 'true';
  }

  private setAsLoggedIn(loggedin: boolean){
    this.storage.setProperty(this.storage.authKey, loggedin);
  }


}
