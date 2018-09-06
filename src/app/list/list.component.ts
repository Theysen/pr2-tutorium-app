import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

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
