import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team, Player } from '../../models/app.models';
import { HttpHandlerService } from '../http/http-handler.service';  
import { StorageService } from '../storage/storage.service';  
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  

  constructor(private http: HttpHandlerService, private storage: StorageService) { }

  deleteTeam(teamId: string): Observable<any>{
    const endpoint = environment.base_url + environment.team_crud + "?id=" + teamId;

    return this.http.delete(endpoint).pipe(
      switchMap((resp: any) => {
          return of(resp.status);
      })
    );
  }


  createTeam(team: Team): Observable<any>{

    console.log(JSON.stringify(team));

    let endpoint = environment.base_url + environment.team_crud;
    // return this.http.put(endpoint, team).pipe(
    //   switchMap((resp: any) => {
    //       return of(resp.success);
    //   })
    // );
    return of(true);
  }

  editTeam(team: Team): Observable<boolean>{
    return of(true);
  }

  getMyTeams(): Observable<Team[]>{

    let user = this.storage.readUserInfo();
    const endpoint = environment.base_url + environment.team_list;

    return this.http.get(endpoint).pipe(
      switchMap((resp: any) => {
          let data = resp.data;
          let teams = [];
          for(let i =0; i < data.length; i++){
            let team = this.parseForTeam(data[i]);
            teams.push(team);
          }
          return of(teams);
      })
    );
  }

  parseForTeam(obj: any): Team{
    let players = undefined;

    if(obj.players)
      players = this.getPlayers(obj.players);
    
    let user = this.storage.readUserInfo().user;

    let t: Team = {
      id: obj.id,
      owner: user,
      name: obj.name,
      totalPoints: obj.totalPts,
      totalAst: obj.totalAssists,
      totalReb: obj.totalRebounds,
      guards: players.guards,
      forwards: players.forwards
    }
    return t;
  }

  private getPlayers(playersJSON: any): any{
    let players: any = {} 

    for(let i=0; i < playersJSON.length; i++){

      let id = playersJSON[i].id.playerId + "";
      let obj = playersJSON[i].player;
      let assignedPosition = playersJSON[i].assignedPosition.toUpperCase();
      let p: Player = {
            id: id,
            name: obj.name,
            position: obj.position,
            averagePoints: obj.avgPts,
            pic: obj.picture,
            assignedPosition: assignedPosition,
            averageAST: obj.avgAssists,
            averageREB: obj.avgRebounds
      }

      players[assignedPosition] = p;
    }

    return this.formatPlayers(players);
  }

  private formatPlayers(map: any){
    
    let guards = [];
    let forwards = [];

    guards.push(map["PG"]);
    guards.push(map["SG"]);
    guards.push(map["SF"]);

    forwards.push(map["PF"]);
    forwards.push(map["C"]);

    return {
      guards: guards,
      forwards: forwards
    }
  }



  getTeam(id): Observable<any>{

    if(!id)
      return of(this.createBlankTeam());

    return this.getMyTeams().pipe(
      switchMap((myTeams: any) => {
        
        for(let i =0; i < myTeams.length; i++){
          if(myTeams[i].id == id){
            return of(myTeams[i])
          }
        }
        return of();
      })
    );
  }

  createBlankTeam(): any{
    let pg: Player = {
      id: "",
      name: "",
      position: "PG",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPosition: "PG",
      averageAST: 0,
      averageREB: 0,
    }

    let sg: Player = {
      id: "",
      name: "",
      position: "SG",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPosition: "SG",
      averageAST: 0,
      averageREB: 0,
    }

    let sf: Player = {
      id: "",
      name: "",
      position: "SF",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPosition: "SF",
      averageAST: 0,
      averageREB: 0,
    }

    let pf: Player = {
      id: "",
      name: "",
      position: "PF",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPosition: "PF",
      averageAST: 0,
      averageREB: 0,
    }


    let c: Player = {
      id: "",
      name: "",
      position: "C",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPosition: "C",
      averageAST: 0,
      averageREB: 0,
    }

    let guards = [pg, sg, sf];
    let forwards = [pf, c];

    let blankTeam: Team= {
      id: "",
      name: "",
      owner: "",
      totalPoints: 0,
      totalAst: 0,
      totalReb: 0,
      guards: guards,
      forwards: forwards
    }

    return blankTeam;
  }

  getTeamGlobalRanks(){
    const endpoint = environment.base_url + environment.leaderboard;

    return this.http.get(endpoint).pipe(
      switchMap((resp: any) => {
          let data = resp.data;
          let teams = [];
          for(let i =0; i < data.length; i++){

            let teamJSON = data[i]; 
            let team = this.parseLeaderBoardEntry(data[i]);
            teams.push(team);
          }
          return of(teams);
      })
    );
  }

  private parseLeaderBoardEntry(obj: any): Team{

    let t: Team = {
      id: obj.id,
      name: obj.name.split("-")[0],
      totalPoints: obj.totalPts,
      totalAst: obj.totalAssists,
      totalReb: obj.totalRebounds,
      guards: null,
      forwards: null,
      owner: obj.name.split("-")[1]
    }
    
    return t;

  }
}
