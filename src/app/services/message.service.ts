import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  uri: String = 'http://localhost:4000/messages';

  constructor(private http: HttpClient) {
  }

  getMessages() {
    return this.http.get(`${this.uri}`);
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

}
