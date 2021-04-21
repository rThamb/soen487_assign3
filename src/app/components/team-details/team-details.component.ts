import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerPickerComponent } from '../player-picker/player-picker.component';
import { Team, Player } from '../../models/app.models';
import { Observable, of} from 'rxjs';
import { TeamService } from '../../services/team/team.service';
import { StorageService } from '../../services/storage/storage.service';

import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @ViewChild('playerPicker') playerPicker: PlayerPickerComponent;

  currentTeam: Team;
  editMode: boolean;

  teamName = new FormControl();


  constructor(private teamService: TeamService, private storage: StorageService) { }

  ngOnInit(): void {
    this.readTeamDetailsFromStorage().subscribe( team => {
      if(team.id === "")
        this.editMode = true;
      this.getTeam(team.id).subscribe( team => {
        this.currentTeam = team;
        this.teamName.setValue(team.name);
        this.saveTeamToStorage(team);
      })
    });
  }

  readTeamDetailsFromStorage(): Observable<Team>{
    let team = this.storage.loadTeamFromLocalStorage();
    return of(team);
  }
  
  saveTeamToStorage(team: Team){
    this.storage.saveTeamToLocalStorage(team);
  }

  showPlayerPicker(pos: string){
    if(this.editMode)
      this.playerPicker.showPlayerPicker(this.currentTeam, pos);
  }

  getTeam(id: string): Observable<Team>{
    return this.teamService.getTeam(id);
  }


  toggleEditHandler(){
    if(this.editMode){
      this.sendChanges()
    }else{
      this.editMode = true;
    }
  }


  private sendChanges(){

    this.editMode = false;
    let request: Observable<boolean> = null;
    this.currentTeam.name = this.teamName.value;

    if(this.currentTeam.id){
      request = this.teamService.editTeam(this.currentTeam);
    }else{
      request = this.teamService.createTeam(this.currentTeam);
    }

    request.subscribe( success => {
      if(success){
        alert("Saving")
        this.storage.saveTeamToLocalStorage(this.currentTeam);
      }else
        alert("Failed");
    });
  }


}
