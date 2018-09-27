import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DateService {


  // Production
  // uri: String = 'https://arcane-hamlet-34988.herokuapp.com/dates';
  // Development Server Address
  uri: String = 'http://localhost:4000/dates';

  constructor(private http: HttpClient) {
  }

  getDates() {
    return this.http.get(`${this.uri}`);
  }


  addDate(day, month, year, possibleSlots, startTime) {
    const date = {
      date: [day, month, year],
      possibleSlots: possibleSlots,
      startTime: startTime, // needs to be int array
    };
    return this.http.post(`${this.uri}`, date);
  }

  bookSlot(day, month, year, bookedByGroup, startTime, message, roomNumber, verifyId) {
    const slot = {
      date: [day, month, year],
      bookedByGroup: bookedByGroup,
      startTime: startTime,
      message: message,
      roomNumber: roomNumber,
      verifyId: verifyId
    };
    return this.http.put(`${this.uri}`, slot);
  }

}
