import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as util from 'util' // has no default export
import {inspect} from 'util' // or directly


@Injectable({
  providedIn: 'root'
})
export class DateService {

  uri: String = 'http://localhost:3000/dates';

  constructor(private http: HttpClient) {
  }

  getDates() {
    return this.http.get(`${this.uri}`);
  }

  getDateById(id) {
    return this.http.get(`${this.uri}/${id}`);
  }


  addDate(day, month, year, bookedByGroup, subject) {
    const date = {
      day: day,
      month: month,
      year: year,
      bookedByGroup: bookedByGroup,
      subject: subject
    };

    return this.http.post(`${this.uri}`, date);
  }


  deleteDate(id) {
  return this.http.delete(`${this.uri}/{id}`);
  }
}
