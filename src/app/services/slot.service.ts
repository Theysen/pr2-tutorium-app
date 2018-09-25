import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SlotService {


  // Production
  // uri: String = 'https://arcane-hamlet-34988.herokuapp.com/slots';
  // Development Server Adress
  uri: String = 'http://localhost:4000/slots';

  constructor(private http: HttpClient) {
  }

  getIndex() {
    return this.http.get(`${this.uri}`);
  }

}
