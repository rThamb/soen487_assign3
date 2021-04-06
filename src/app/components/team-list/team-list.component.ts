import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { TeamService } from '../../services/team/team.service';
import { Team } from '../../models/app.models';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  myTeams: Team[];

  constructor(private teamService: TeamService, private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
    this.teamService.getMyTeam().subscribe( teams => this.myTeams = teams);
  }


  createTeam(){
   alert("Create team");
  }

  viewTeamDetails(){
    this.saveInLocalStorage(this.myTeams[0]);
    this.visitTeamDetailsPage();
  }

  private saveInLocalStorage(team: Team){
    this.storage.saveTeamToLocalStorage(team);
  }

  visitTeamDetailsPage(){
      this.router.navigate(['/team']);
  }
}
