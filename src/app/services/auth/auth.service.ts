import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service'; 
import { Observable, of } from 'rxjs';
import { HttpHandlerService } from '../http/http-handler.service';  
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private storage: StorageService, private http: HttpHandlerService) {}

  validateCredentials(user: string, pwd: string): Observable<any>{
    
    let login = {
      username: user,
      password: pwd
    };

    const endpoint = environment.base_url + environment.auth;

    return this.http.post(endpoint, login).pipe(
      switchMap((resp: any) => {

        if(resp.status){
          let token = resp.data[0];
          this.saveUserInState(user, token);
          this.setAsLoggedIn(true);
          return of(true);  
        }else{
          return of(false);
        }
      })
    );
  }

  logout(){

    if(this.isLoggedIn()){
      this.setAsLoggedIn(false);
      this.clearAppState();
    }

  }

  isLoggedIn(): boolean{
    return this.storage.getProperty(this.storage.authKey) == 'true';
  }

  private setAsLoggedIn(loggedin: boolean){
    this.storage.setProperty(this.storage.authKey, loggedin);

    if(!loggedin)
      this.storage.setProperty(this.storage.userKey, null);
  }

  private saveUserInState(username: string, token: string){
    let data = JSON.stringify({user: username, token: token});
    this.storage.setProperty(this.storage.userKey, data);
  }

  private clearAppState(){
    this.storage.clear();
  }

}
