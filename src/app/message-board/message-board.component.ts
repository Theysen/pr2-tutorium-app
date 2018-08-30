import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  entries: string[] = Array();

  constructor() {
    const message = "Hello World";
    this.entries.push(message);
    this.entries.push(message);
  }

  ngOnInit() {
  }

}
