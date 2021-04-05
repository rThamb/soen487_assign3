import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerPickerComponent } from '../player-picker/player-picker.component';
import { Team, Player } from '../../models/app.models';
import { Observable, of} from 'rxjs';
import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @ViewChild('playerPicker') playerPicker: PlayerPickerComponent;

  currentTeam: Team;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeam().subscribe( team => {
      this.currentTeam = team;
    });
  }

  showPlayerPicker(pos: string){
    this.playerPicker.showPlayerPicker(this.currentTeam, pos);
  }

  getTeam(): Observable<Team>{
    return this.teamService.getTeam();
  }



}
