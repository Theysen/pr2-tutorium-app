import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {
  newMessage: FormGroup;
  loading = false;
  sucess = false;
  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.newMessage = this.fb.group({
      author: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*'),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      title: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9 .,!?-]*'),
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      body: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9 .,!?-]*')
      ]]});

    this.newMessage.valueChanges.subscribe(console.log);
    }
    get title() {
      return this.newMessage.get('title');
    }
  get author() {
    return this.newMessage.get('author');
  }
  get body() {
    return this.newMessage.get('body');
  }

  async submitHandler() {
    this.loading = true;
    try {
          this.messageService.addMessage(this.author.value, this.title.value, this.body.value).subscribe((message) => {
        console.log(message);
       });
          this.sucess = true;
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }
}
