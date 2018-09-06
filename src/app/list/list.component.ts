import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getMessagesById("5b9103c1ab174729f861b9ac").subscribe((message) => {
      console.log(message);
    });

    this.messageService.getMessages().subscribe((messages) => {
      console.log(messages);
    });

  }

}
