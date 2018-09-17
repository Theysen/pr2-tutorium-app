import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as util from 'util' // has no default export
import {inspect} from 'util' // or directly


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  uri: String = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {
  }

  getMessages() {
    return this.http.get(`${this.uri}`);
  }

  getMessagesById(id) {
    return this.http.get(`${this.uri}/${id}`);
  }


  addMessage(author, title, body) {
    const message = {
      title: title,
      author: author,
      body: body,
      date: Date.now()
    };

    return this.http.post(`${this.uri}`, message);
  }

  deleteMessage(id) {
    return this.http.delete(`${this.uri}/{id}`);
  }
}
