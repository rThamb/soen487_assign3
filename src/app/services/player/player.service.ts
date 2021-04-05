import { Injectable } from '@angular/core';
import { Player } from '../../models/app.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getPlayers(): Observable<Player[]>{
    let p1: Player = {
      name: "Kyrie, Irving",
      position: "PG",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/i/headshots/nba/players/full/6442.png'
    }

    let p2: Player = {
      name: "James, Harden",
      position: "PG",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/i/headshots/nba/players/full/6442.png'
    }

    let players = [p1, p2];
    
    return of(players);
  }

}
