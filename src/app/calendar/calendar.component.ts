import { Component, OnInit, } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: ['.calendar {\n' +
  '  text-align: center;\n' +
  '  padding: 0.185rem 0.25rem;\n' +
  '  display: inline-block;\n' +
  '  height: 2rem;\n' +
  '  width: 2rem;\n' +
  '}\n' +
  '.calendar.free {\n' +
  '  background-color: rgba(83, 109, 254, 0.5);\n' +
  '}\n' +
  '.calendar.full {\n' +
  '  background-color: rgba(255, 82, 82, 0.5);\n' +
  '}\n' +
  '.calendar.selected {\n' +
  '  background-color: rgba(48, 63, 159, 0.8);\n' +
  '  color: white;\n' +
  '}\n' +
  '.calendar:hover {\n' +
  '  background-color: rgba(48, 63, 159, 0.8);\n' +
  '  color: white;\n' +
  '}\n' +
  '.calendar.past{\n' +
  '  color: #cccccc;\n' +
  '}' +
  '.messages {\n' +
  '  magin: 1.5rem;\n' +
  '  padding: 1rem;\n' +
  '  z-index: -1;\n' +
  '\n' +
  '}\n' +
  '\n' +
  '.mat-elevation-z6{\n' +
  '  margin: 2rem;\n' +
  '  padding: 2rem;\n' +
  '}\n' +
  '.example-fill-remaining-space {\n' +
  '  /* This fills the remaining space, by using flexbox.\n' +
  '     Every toolbar row uses a flexbox row layout. */\n' +
  '  flex: 1 1 auto;\n' +
  '}'],
  //styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  freeDates: NgbDate[];
  fullDates: NgbDate[];
  focusedDate: NgbDate;
  fromDate: NgbDate;
  today: NgbDate

  constructor(calendar: NgbCalendar) {
    this.today = calendar.getToday();
    this.freeDates=[(new NgbDate(2018,9,14)),(new NgbDate(2018,9,22)), (new NgbDate(2018,9,20))];
    this.fullDates= [(new NgbDate(2018,9,18)), (new NgbDate(2018,9,28))];

    this.fromDate = this.freeDates[0];
  }
  onDateSelection(date: NgbDate) {
    for(let dat of this.freeDates){
      if(date.equals(dat)){
        this.focusedDate = date;
        this.fromDate = date;
        return true;
      }
    }
    return false;
  }

  isSelected(date: NgbDate){
    return date.equals(this.fromDate);
  }

  isFree(date: NgbDate){
    for (let dat of this.freeDates) {
      if(date.equals(dat)){
        return true;
      }
    }
    return false;
  }

  isFull(date: NgbDate){
    for (let dat of this.fullDates) {
      if(date.equals(dat)){
        return true;
      }
    }
    return false;
  }

  isPast(date:NgbDate , cal:NgbCalendar){
    if(date.before(this.today)){
      return true;
    }
  }
  getDate(){
    return this.fromDate;
  }

  ngOnInit(){}

}
