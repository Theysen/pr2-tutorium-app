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
    const title = "Hello World!";
    const message = "Lorem Ipsum";
    const dateCreated = new Date().toDateString();

    this.entries.push(new Message(title, message, dateCreated));
    this.entries.push(new Message(title, message, dateCreated));

  }

  ngOnInit() {
  }

}
