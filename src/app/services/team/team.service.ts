import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team, Player } from '../../models/app.models';
import { HttpHandlerService } from '../http/http-handler.service';  
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  

  constructor(private http: HttpHandlerService) { }

  createTeam(team: Team): Observable<any>{

    let endpoint = environment.team_details.replace("{id}", team.id);
    return this.http.put(endpoint, team).pipe(
      switchMap((resp: any) => {
          return of(resp.success);
      })
    );
  }

  editTeam(team: Team): Observable<boolean>{
    return of(true);
  }

  getMyTeam(): Observable<Team[]>{

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

    let t: Team = {
      id: obj.id,
      owner: obj.owner,
      name: obj.name,
      totalPoints: obj.totalPoints,
      totalAst: obj.totalAst,
      totalReb: obj.totalReb,
      guards: obj.guards,
      forwards: obj.forwards
    }
    return t;
  }

  getTeam(id): Observable<any>{

    if(!id)
      return of(this.createBlankTeam());

    let endpoint_part = environment.team_details.replace("{id}", id);

    const endpoint = environment.base_url + endpoint_part;

    return this.http.get(endpoint).pipe(
      switchMap((resp: any) => {
        let data = resp.data;
        let team: Team = this.parseForTeam(data);
        return of(team);    
      })
    );
  }

  createBlankTeam(): any{
    let pg: Player = {
      name: "",
      position: "PG",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPostition: "PG",
      averageAST: 0,
      averageREB: 0,
    }

    let sg: Player = {
      name: "",
      position: "SG",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPostition: "SG",
      averageAST: 0,
      averageREB: 0,
    }

    let sf: Player = {
      name: "",
      position: "SF",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPostition: "SF",
      averageAST: 0,
      averageREB: 0,
    }

    let pf: Player = {
      name: "",
      position: "PF",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPostition: "PF",
      averageAST: 0,
      averageREB: 0,
    }


    let c: Player = {
      name: "",
      position: "C",
      averagePoints: 0,
      pic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z",
      assignedPostition: "C",
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
      owner: "JIM",
      name: "My Team API",
      totalPoints: 123,
      guards: guards,
      forwards: forwards,
      totalAst: 35,
      totalReb: 50
    }
    return team;
  }




  getTeamGlobalRanks(){
    const endpoint = environment.base_url + environment.leaderboard;

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
}
