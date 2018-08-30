import { Component, OnInit } from '@angular/core';
import {Message} from "./Message";

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  entries: Message[] = Array();


  constructor() {

    for(var _i =0;_i<10;_i++){
      const message = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n";
      const title = "Überschrift";
      const dateCreated = new Date().toDateString();

      this.entries.push(new Message(title, message, dateCreated));
      this.entries.push(new Message(title, message, dateCreated));
    }


  }

  ngOnInit() {
  }

}
