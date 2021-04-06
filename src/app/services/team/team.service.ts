import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team, Player } from '../../models/app.models'; 

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  editTeam(team: Team):void{
    return;
  }

  getMyTeam(): Observable<Team[]>{
    let team = this.createMockTeam();
    let arr = [team];
    return of(arr); 
  }

  getTeam(): Observable<Team>{
    return of(this.createMockTeam());
  }


  createMockTeam(): Team{
    let p1: Player = {
      name: "Kyrie, Irving",
      position: "PG",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/i/headshots/nba/players/full/6442.png',
      assignedPostition: 'PG',
      averageAST: 30,
      averageREB: 1
    }

    let p2: Player = {
      name: "James, Harden",
      position: "PG",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3992.png&w=350&h=254',
      assignedPostition: 'SG',
      averageAST: 30,
      averageREB: 10
    }

    let p3: Player = {
      name: "Jarette Allen",
      position: "C",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/i/headshots/nba/players/full/4066328.png',
      assignedPostition: 'C',
      averageAST: 1,
      averageREB: 20
    }

    let p4: Player = {
      name: "Stevn, Adams",
      position: "PF",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2991235.png&w=350&h=254',
      assignedPostition: 'PF',
      averageAST: 3,
      averageREB: 21
    }
     let p5: Player = {
      name: "Kevin Durant",
      position: "SF",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png',
      assignedPostition: 'SF',
      averageAST: 30,
      averageREB: 9
    }

    let guards = [p1, p2, p5];
    let forwards = [p4, p3];
    
    let team: Team = {
      id: '1',
      name: "My Team",
      totalPoints: 123,
      guards: guards,
      forwards: forwards,
      totalAst: 35,
      totalReb: 50
    }
    return team;
  }
}
