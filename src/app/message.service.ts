import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  uri: String = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {
  }

  getMessages() {
    return this.http.get(`${this.uri}`);
  }

  getMessagesById(id) {
    return this.http.get(`${this.uri}/${id}`);
  }

  addMessage(author, content) {
    const message = {
      author: author,
      content: content
    };
    return this.http.post(`${this.uri}`, message);
  }

  deleteMessage(id) {
    return this.http.delete(`${this.uri}/{id}`);
  }
}
