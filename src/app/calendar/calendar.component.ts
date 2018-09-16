import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',

  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  freeDates: NgbDate[];
  fullDates: NgbDate[];
  focusedDate: NgbDate;
  fromDate: NgbDate;
  today: NgbDate;
  calendar: NgbCalendar;

  constructor(calendar: NgbCalendar, private dateService: DateService) {
    this.today = calendar.getToday();
    this.freeDates = [(new NgbDate(2018, 9, 14)), (new NgbDate(2018, 9, 22)), (new NgbDate(2018, 9, 20))];
    this.fullDates = [(new NgbDate(2018, 9, 18)), (new NgbDate(2018, 9, 28))];
    this.calendar = calendar;

    this.fromDate = this.freeDates[0];
  }

  onDateSelection(date: NgbDate) {
    for (const dat of this.freeDates) {
      if (date.equals(dat)) {
        this.focusedDate = date;
        this.fromDate = date;
        return true;
      }
    }
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

  isPast(date: NgbDate, cal: NgbCalendar) {
    if (date.before(this.today)) {
      return true;
    }
    if (this.calendar.getWeekday(date) >= 6) {
      return true;
    }
    return false;

  }

  getDate() {
    return this.fromDate;
  }

  ngOnInit() {

  }


}
