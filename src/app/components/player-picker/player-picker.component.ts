import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player-picker',
  templateUrl: './player-picker.component.html',
  styleUrls: ['./player-picker.component.css']
})
export class PlayerPickerComponent implements OnInit {

  @ViewChild('mymodal') popBtn: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  showPlayerPicker(){
    document.getElementById('mymodal').click();
  }
}
