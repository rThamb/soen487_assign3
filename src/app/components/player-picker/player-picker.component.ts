import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player, Team } from '../../models/app.models';
import { FormControl } from '@angular/forms';
import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-player-picker',
  templateUrl: './player-picker.component.html',
  styleUrls: ['./player-picker.component.css']
})
export class PlayerPickerComponent implements OnInit {

  @ViewChild('mymodal') popBtn: ElementRef;

  searchTerm = new FormControl();
  activeList: Player[] = [];
  private league_players: Player[];

  currentTeam: Team;
  currentPosition: string;

  constructor() { }

  ngOnInit(): void {
    this.getPlayers().subscribe( players => {
      this.league_players = players;
      this.activeList = players;
    });
  }

  showPlayerPicker(editingPosition: string){
    this.currentPosition = editingPosition;
    document.getElementById('mymodal').click();
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

  private getPlayers(): Observable<Player[]>{
    let p1: Player = {
      name: "Kyrie, Irving",
      position: "PG",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/i/headshots/nba/players/full/6442.png'
    }

    let p2: Player = {
      name: "James, Harden",
      position: "PG",
      averagePoints: 34,
      pic: 'https://a.espncdn.com/i/headshots/nba/players/full/6442.png'
    }

    let players = [p1, p2];
    
    return of(players);
  }


}
