import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../date.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',

  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  freeDates: NgbDate[];
  fullDates: NgbDate[];
  focusedDate: NgbDate;
  fromDate: NgbDate;

  calendar: NgbCalendar;

  constructor(calendar: NgbCalendar, private dateService: DateService) {

    this.freeDates = [(new NgbDate(2018, 9, 14)), (new NgbDate(2018, 9, 22)), (new NgbDate(2018, 9, 20))];
    this.fullDates = [(new NgbDate(2018, 9, 18)), (new NgbDate(2018, 9, 28))];
    this.calendar = calendar;
  }

  onDateSelection(date: NgbDate) {

    this.focusedDate = date;
    this.fromDate = date;
    return false;
  }
  isRightDay(date: NgbDate){

  }
  isSelected(date: NgbDate) {
    return date.equals(this.fromDate);
  }

  isFree(date: NgbDate) {
    for (const dat of this.freeDates) {
      if (date.equals(dat)) {
        return true;
      }
    }
    return false;
  }

  isFull(date: NgbDate) {
    for (const dat of this.fullDates) {
      if (date.equals(dat)) {
        return true;
      }
    }
    return false;
  }



  getDate() {
    return this.fromDate;
  }

  ngOnInit() {

  }


}
