import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player, Team } from '../../models/app.models';
import { FormControl } from '@angular/forms';
import { Observable, of} from 'rxjs';
import { PlayerService } from '../../services/player/player.service';
import { TeamService } from '../../services/team/team.service';


@Component({
  selector: 'app-player-picker',
  templateUrl: './player-picker.component.html',
  styleUrls: ['./player-picker.component.css']
})
export class PlayerPickerComponent implements OnInit {

  @ViewChild('mymodal') popBtn: ElementRef;

  searchTerm = new FormControl();
  activeList: Player[] = [];

  selectedPlayer: Player;
  selectedElement: HTMLElement;
 
  private league_players: Player[];

  currentTeam: Team;
  currentPosition: string;

  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
  }

  showPlayerPicker(team: Team, editingPosition: string){

    if(!this.league_players)
      this.loadPlayers();

    this.currentTeam = team;
    this.currentPosition = editingPosition;

    this.selectedPlayer = null;

    if(this.selectedElement)
      this.selectedElement.className = "inactivePlayerSelect";
    document.getElementById('mymodal').click();
  }

  loadPlayers(){

    this.getPlayers().subscribe( players => {
      alert("Got data from backend");
      this.league_players = players;
      this.activeList = players;
    });
  }

  filterByName(event){
    if(this.searchTerm.value.length == 0){
      this.activeList = this.league_players;
    }else{

      let players = [];

      for(let i =0; i < this.activeList.length; i++){
        if(this.activeList[i].name.startsWith(this.searchTerm.value)){
          players.push(this.activeList[i]);
        }
      }
      this.activeList = players;
    }
  }

  setSelected(event, player: Player){
    this.selectedPlayer = player;

    if(this.selectedElement != null){
      this.selectedElement.className = "inactivePlayerSelect";
    }
    this.selectedElement = (event.target.tagName != 'TR')? event.target.parentElement: event.target;
    this.selectedElement.className = "activePlayerSelect";
  }

  private getPlayers(): Observable<Player[]>{
    return this.playerService.getPlayers();
  }

  swapPlayer(){
    let done = false;
    let players: Player[] = null;

    if(this.currentPosition == 'PF' || this.currentPosition == 'C'){
      players = this.currentTeam.forwards;
    }else{
      players = this.currentTeam.guards;
    }
    //working with the team object reference
    this.swapPlayerFromList(players);
  }

  swapPlayerFromList(players: Player[]){
    for(let i = 0; i < players.length; i++){
        if(players[i].assignedPostition == this.currentPosition){
          players.splice(i, 1, this.copyPlayer(this.selectedPlayer, this.currentPosition));
        }
    }
  }

  copyPlayer(player: Player, position: string): Player{
    let copy: Player = {
      name: player.name,
      position: player.name,
      assignedPostition: position,
      averagePoints: player.averagePoints,
      pic: player.pic
    }
    return copy;
  }


}
