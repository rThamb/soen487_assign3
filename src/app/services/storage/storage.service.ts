import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public authKey: string = "loggedin";
  private keys: string[] = ['loggedin'];

  constructor() { 
    this.setup();
  }

  setup(){
    for(let i =0; i < this.keys.length; i++){
      if(!this.getProperty(this.keys[i])){
        this.setProperty(this.keys[i], "");
      }
    }
  }

  getProperty(key: string): any{
      return localStorage.getItem(key);
  }

  setProperty(key: string, value: any): void{
      localStorage.setItem(key, value);
  }
}
