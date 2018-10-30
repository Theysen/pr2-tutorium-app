import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-date',
  templateUrl: './create-date.component.html',
  styleUrls: ['./create-date.component.css']
})
export class CreateDateComponent implements OnInit {
  constructor() {
    this.startTime = new Array(12, 0);
    this.year = 2018;
    this.month = 11;
    this.day = 1;
  }

  day: number;
  month: number;
  year: number;
  startTime: any;
  roomNumber: string;
  amountOfSlots: number;

  ngOnInit() {

  }

  toString(): String {

    if (this.roomNumber === undefined || this.amountOfSlots === undefined) {
      throw new Error('Empty!');
    }

    return 'day: ' + this.day + 'month:' + this.month + 'year: ' + this.year + 'starttime: ' + this.startTime[0] + ':' + this.startTime[1] +
      'roomnumber: ' + this.roomNumber + 'slots: ' + this.amountOfSlots;
  }

  printValues() {
    console.log('Data: ' + this.toString());
  }
}
