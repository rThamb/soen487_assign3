import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team/team.service';
import { Team } from '../../models/app.models';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  myTeamRanks: any[];
  globalRanks: any[];

  private myTeams: Team[];
  private globalTeam: Team[];

  constructor(private teamService: TeamService, private storage: StorageService) { }

  ngOnInit(): void {
    this.myTeamRanks = [];
    this.globalRanks = [];
    this.getRanks();
  }

  getRanks(){
    let user = this.storage.readUserInfo();
    this.teamService.getTeamGlobalRanks().subscribe( teams => {

      for(let i = 0; i < teams.length; i++){
        let entry = this.makeEntry(i + 1, teams[i], user.user);
        this.globalRanks.push(entry)

        if(teams[i].owner == user.user){
          this.myTeamRanks.push(entry)
        }
      }
    });
  }

  private makeEntry(rank: number, team: Team, user: string){
    let teamRank = {
      rank: rank,
      user: user,
      points: team.totalPoints + team.totalAst + team.totalReb
    }
    return teamRank;
  }



}
