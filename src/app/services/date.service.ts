import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  uri: String = environment.baseAPIUrl + '/dates';

  constructor(private http: HttpClient) {
  }

  getDates() {
    return this.http.get(`${this.uri}`);
  }

  addDate(day, month, year, possibleSlots, startTime) {
    const date = {
      date: [day, month, year],
      possibleSlots: possibleSlots,
      startTime: startTime // needs to be int array
    };
    return this.http.post(`${this.uri}`, date);
  }

  bookSlot(
    day,
    month,
    year,
    bookedByGroup,
    startTime,
    message,
    roomNumber,
    verifyId
  ) {
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
