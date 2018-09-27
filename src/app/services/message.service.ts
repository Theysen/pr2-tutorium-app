import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Production
  uri: String = ' https://arcane-hamlet-34988.herokuapp.com/messages';
  // Development Server Adress 
  // uri: String = 'http://localhost:4000/messages';

  constructor(private http: HttpClient) {
  }

  getMessages() {
    return this.http.get(`${this.uri}`);
  }


  addMessage(author, title, content) {
    const message = {
      title: title,
      author: author,
      content: content,
      date: Date.now()
    };

    return this.http.post(`${this.uri}`, message);
  }

}
