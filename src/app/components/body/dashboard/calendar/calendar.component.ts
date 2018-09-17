import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../../../services/date.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../services/message.service';
import {group} from '@angular/animations';

let dateIsValid = false;

function dateValidator(control: AbstractControl) {
  if (!dateIsValid) {
    return {
      isError: true
    };
  }
  return null;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  freeDates: NgbDate[];
  fullDates: NgbDate[];
  selectedDate: NgbDate;
  newAppointment: FormGroup;
  loading = false;
  success = false;

  constructor(private calendar: NgbCalendar, private dateService: DateService, private fb: FormBuilder) {
    this.freeDates = [];
    this.fullDates = [];
    console.log('dates');
    this.dateService.getDates().subscribe((dates: Response) => {

      const generalDates: any = dates;

      console.log(generalDates);
      for (const a of generalDates) {
        this.fullDates.push(new NgbDate(a.year, a.month, a.day));
      }
      console.log(this.fullDates);
    });


    console.log('dates');
  }

  onDateSelection(date: NgbDate) {
    for (const dat of this.freeDates) {
      if (date.equals(dat) && !this.isFull(date)) {
        this.selectedDate = date;
        dateIsValid = true;
        this.val();
        return true;
      }
    }
    return false;
  }

  // checks if date is free and pushes it (if free) to the free days array.
  checkFreeDay(date: NgbDate) {
    let isFree = false;
    if ((this.calendar.getWeekday(date) === 2 || this.calendar.getWeekday(date) === 4) && !this.isPast(date)) {
      isFree = true;
      for (const day of this.fullDates) {
        if (date.equals(day)) {
          isFree = false;
        }
      }
    }
    if (isFree) {
      this.freeDates.push(date);
    }
  }

  // checks if date is equals to selected date;
  isSelected(date: NgbDate) {
    return date.equals(this.selectedDate);
  }

  // runs the checkFreeDay function and checks afterwards if the date is in the free day list
  isFree(date: NgbDate): boolean {
    this.checkFreeDay(date);
    for (const day of this.freeDates) {
      if (day.equals(date)) {
        return true;
      }
    }
    return false;
  }

  log(x) {
    console.log(x);
  }

  // checks if day is in the fullDay array
  isFull(date: NgbDate): boolean {
    for (const dat of this.fullDates) {
      if (date.equals(dat)) {
        return true;
      }
    }
    return false;
  }


  isPast(date: NgbDate): boolean {
    if (date.before(this.calendar.getToday())) {
      return true;
    }
    return false;
  }

  getSelectedDateToString() {
    if (this.selectedDate == null) {
      return null;
    } else {
      let out: String;
      out = '';
      out += this.selectedDate.day + '/' + this.selectedDate.month + '/' + this.selectedDate.year;
      if (this.calendar.getWeekday(this.selectedDate) === 2) {
        out += ' - 19:00 Uhr - H307';
      } else if (this.calendar.getWeekday(this.selectedDate) === 4) {
        out += ' - 16:00 Uhr - H503';
      }
      return out;
    }
  }

  val() {
    this.newAppointment.controls['date'].updateValueAndValidity();
  }

  ngOnInit() {
    this.selectedDate = null;
    this.newAppointment = this.fb.group({
      date: ['', [
        dateValidator
      ]],
      group: ['', [
        Validators.required
      ]],
      msg: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9 .,!?-]*'),
        Validators.maxLength(150),
      ]]
    });
    this.newAppointment.valueChanges.subscribe(console.log);
  }

  get date() {
    return this.newAppointment.get('date');
  }

  get group() {
    return this.newAppointment.get('group');
  }

  get msg() {
    return this.newAppointment.get('msg');
  }

  async submitHandler() {
    this.loading = true;
    try {
      this.dateService.addDate(
        this.selectedDate.day, this.selectedDate.month,
        this.selectedDate.year, this.group.value, this.msg.value).subscribe((message) => {
        console.log(message);
      });
      this.success = true;
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }

  reload() {
    location.reload();
  }
}
