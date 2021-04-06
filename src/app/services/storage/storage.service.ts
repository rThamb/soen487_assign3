import { Injectable } from '@angular/core';
import { Team, Player } from '../../models/app.models';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public authKey: string = "loggedin";
  public activeTeamDetails: string = 'team';
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

  loadTeamFromLocalStorage(): Team{
    let key = this.activeTeamDetails;
    let jsonData = this.getProperty(key)
    let team: Team = JSON.parse(jsonData);
    return team;
  }

  saveTeamToLocalStorage(team: Team){
    let s_key = this.activeTeamDetails;
    let dataJson = JSON.stringify(team);
    this.setProperty(s_key, dataJson);
  }

  getProperty(key: string): any{
      return localStorage.getItem(key);
  }

  setProperty(key: string, value: any): void{
      localStorage.setItem(key, value);
  }
}
