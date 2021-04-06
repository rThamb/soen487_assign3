import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerPickerComponent } from '../player-picker/player-picker.component';
import { Team, Player } from '../../models/app.models';
import { Observable, of} from 'rxjs';
import { TeamService } from '../../services/team/team.service';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @ViewChild('playerPicker') playerPicker: PlayerPickerComponent;

  currentTeam: Team;
  editMode: boolean;

  constructor(private teamService: TeamService, private storage: StorageService) { }

  ngOnInit(): void {
    this.readTeamDetailsFromStorage().subscribe( team => {
      this.currentTeam = team;
    });
  }

  readTeamDetailsFromStorage(): Observable<Team>{
    let team = this.storage.loadTeamFromLocalStorage();
    return of(team);
  }

  showPlayerPicker(pos: string){
    if(this.editMode)
      this.playerPicker.showPlayerPicker(this.currentTeam, pos);
  }

  getTeam(): Observable<Team>{
    return this.teamService.getTeam();
  }


  toggleEditHandler(){
    if(this.editMode){
      alert("Saving");
      this.editMode = false;
      //api call
      this.teamService.editTeam(this.currentTeam);

      //save to local storage
      this.storage.saveTeamToLocalStorage(this.currentTeam);

    }else{
      alert("Editing");
      this.editMode = true;
    }
  }


}
