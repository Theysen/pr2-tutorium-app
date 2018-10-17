import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MessageService {

  uri: string = environment.baseAPIUrl + '/messages';

  constructor(private http: HttpClient) {}

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
