import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  messagesFromDatabase: any;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {

    // this.messageService.addMessage("Lukas Theisen", "Hello World").subscribe((message) => {
    //   console.log(message);
    // })


    this.messageService.getMessages().subscribe((messages) => {
      this.messagesFromDatabase = messages;
    });


  }

}
