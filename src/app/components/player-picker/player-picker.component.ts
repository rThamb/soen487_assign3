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

    if(!this.checkNotDuplicate()){
      alert("Duplicate Player cannot be added");
      return;
    }

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
        if(players[i].assignedPosition == this.currentPosition){
          players.splice(i, 1, this.copyPlayer(this.selectedPlayer, this.currentPosition));
        }
    }
  }

  copyPlayer(player: Player, position: string): Player{
    let copy: Player = {
      id: player.id,
      name: player.name,
      position: player.name,
      assignedPosition: position,
      averagePoints: player.averagePoints,
      pic: player.pic
    }
    return copy;
  }

  checkNotDuplicate(){

    let idSelect = this.selectedPlayer.id;
    let arr = this.currentTeam.guards;
    return !this.playerExists(this.currentTeam.guards, idSelect) && !this.playerExists(this.currentTeam.forwards, idSelect)

  }

  playerExists(players, id){
    for(let i = 0; i < players.length; i++){
      if(players[i].id == id)
        return true;
    }
    return false;
  }

  formatData(stat: number){
    return (Math.round(stat * 100) / 100).toFixed(2);

  }

  getPlayerImage(player: Player){
    let image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBg0REA0PDw8REA0SDg8PDxAODxAPFRIYFxUVExUaHCggGBolGxMTITEhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODg0NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADgQAQABAgMGAgUKBwAAAAAAAAABAgMEBRESITFBUZFhcRMyobHBFCIzNEJicoHh8CNDUoKS0fH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA811RRTMzOkRxlEYjM6q5mKfmxyn7X6AlqrlNHGqI85iHicVbj+ZR/lCuzOs7989ZYBYvllrX6Snu3UzFUaxOsdYVduw+Krw/qzu5xO+AWMcGDzGL1WzVGzVy6S7wAAAAAAAAAAAAAAAAAAAAAAAAAAAcGbYibVqKY41a/lTzBHY7ETdv1fO1piZ2Y5aOYFAAAABNZXipvUzTVOsxppPOYQrZYuzZuxVHL2wgsoxTVtUxMcJiJhkAAAAAAAAAAAAAAAAAAAAAAAABD519Yp/D8UwiM6j+LRP3Z9/wCoI0BQAAAAABYMur28HR4Rp2nR0tGBo2MJRHhE997egAAAAAAAAAAAAAAAAAAAAAAAAI3Ooj0VHXWdPLTf8Ekh861+UU9Nnd33/AEcAoAAAAERqALLYo9HZpjjpEQ2NODiYwtvXjsw3IAAAAAAAAAAAAAAAAAAAAAAAACPzm3tYeKv6Z9kpBrv2ovWaqZ5wCtDbicPVh7mlX5THCYalAAAAB6op264jrMR3eUllmCma6blXCN9Mc58QS0RpEQyCAAAAAAAAAAAAAAAAAAAAAAAAAACLzu36lXnE++PiilgzGjbwVfhGsecK+AAoAAzRTNdURHGZiIWa1R6O3TEcoiEHldG3jKfCJn9908gAAAAAAAAAAAAAAAAAAAAAAAxM6QDI572Mt2uNceUb5cN7Npn1KdPGrf7AS0zo5b2Pt2vtaz0p3oW9iK70/OqmfDhHZqBIYrM5u0TTTTpE7pmd86I8FAAAAGyzeqsXNqmdJ77knYzWmfXjZ8Y3wiBBZrdym7TrTMTHg9qxRXNurWJmJ6xudtnNK6PWiKo7SCaHFZzK3c4zNM+PDu66K4rjdMT5TqD0AAAAAAAAAAAAAAAAADXfvRYtTVPCPbPRAYnE1YivWqd3KOUOrOL+3eimOFPH8Uo8ABQAAAAAAAAAAAAe7V2bNcTTOkx2nzeAFgwWLjFW+lUetH+vB0q1h702LsVRy5dY6LHari7biqOExrCD0AAAAAAAAAAAAAAxM6Qy0Y6v0eErnw077gV+7X6S5VM85mXkFAAAAAAAAAAAAAAAABL5Ne2qKqem+PKUQ7Mqr2cZHjEx7NfggnQAAAAAAAAAAAAAHBnNemGiOtUdo/cO9EZ1XrdojpEz3/4CNAUAAAAAAAAAAAAAAAAG3CVbGJon71PvamaZ0mJ6TALQMROsMoAAAAAAAAAAAACDzf65/bSAOIBQAAAAAAAAAAAAAAAAABZ7f0dPlHuegQAAAAAAf/Z';

    if(player.pic)
      image = player.pic;

    return image;
  }

}
