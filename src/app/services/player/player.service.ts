import { Injectable } from '@angular/core';
import { Player } from '../../models/app.models';
import { Observable, of } from 'rxjs';
import { HttpHandlerService } from '../http/http-handler.service';  
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpHandlerService) { }

  getPlayers(): Observable<Player[]>{

    const endpoint = environment.base_url + environment.league_players;

    return this.http.get(endpoint).pipe(
      switchMap((resp: any) => {
          let data = resp.data;
          let players = [];
          for(let i =0; i < data.length; i++){
            let player = this.parsePlayer(data[i]);
            players.push(player);
          }
          return of(players);
      })
    );
  }

  parsePlayer(obj: any): Player{

    let p: Player = {
            name: obj.name,
            position: obj.position,
            averagePoints: obj.avgPts,
            pic: obj.picture,
            assignedPostition: obj.assignedPostition,
            averageAST: obj.avgAssists,
            averageREB: obj.avgRebounds
        }

    return p;

  }

}
