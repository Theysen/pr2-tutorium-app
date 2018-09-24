import {Component, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../../services/date.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

let dateIsValid = false;

function dateValidator(control: AbstractControl) {
  if (!dateIsValid) {
    return {
      isError: true
    };
  }
  return null;
}

class ServerDate {
  Date: NgbDate;
  startTime: number[];
  endTime: number[];
  appTime: number[];
  possibleSlots: number;
  bookedSlots: number;

  constructor(year: number, month: number, day: number, startTime: number[], possibleSlots: number, bookedSlots: number) {
    this.possibleSlots = possibleSlots;
    this.bookedSlots = bookedSlots;
    this.Date = new NgbDate(year, month, day);
    this.startTime = [startTime[0].valueOf(), startTime[1].valueOf()];
    this.endTime = this.increasedTime([startTime[0].valueOf(), startTime[1].valueOf()], (25 * (this.possibleSlots / 2)));
    this.appTime = this.increasedTime([startTime[0].valueOf(), startTime[1].valueOf()], (25 * ((this.bookedSlots - (this.bookedSlots % 2)) / 2)));
    console.log(this.startTime);
    console.log(this.bookedSlots);
    console.log(this.bookedSlots % 2);
    console.log((25 * ((this.bookedSlots - (this.bookedSlots % 2)) / 2)))

  }

  increasedTime(time: number[], minute: number): number[] {
    if (time[1] + minute >= 60) {
      minute -= 60;
      time[0] += 1;
      time = this.increasedTime(time, minute);
    } else {
      time[1] += minute;

    }
    return time;
  }
}

@Component({
  selector: 'app-compose-date',
  templateUrl: './compose-date.component.html',
  styleUrls: ['./compose-date.component.css']
})

export class ComposeDateComponent implements OnInit {
  allDates: ServerDate[];
  selectedDate: NgbDate;
  newAppointment: FormGroup;
  loading = false;
  success = false;

  constructor(private calendar: NgbCalendar, private dateService: DateService, private fb: FormBuilder) {

    this.allDates = [];
    console.log('dates');
    this.dateService.getDates().subscribe((dates: Response) => {
      const generalDates: any = dates;
      console.log(generalDates);
      for (const data of generalDates) {
        let newData: ServerDate;
        newData = new ServerDate(data.date[2], data.date[1], data.date[0], data.startTime, data.possibleSlots, data.slots.length);
        this.allDates.push(newData);
      }
    });

    console.log('dates');

  }

  get minute() {
    return this.newAppointment.get('startMinute');
  }

  isSelected(date: NgbDate) {
    if (this.selectedDate === null) {
      return false;
    }
    return date.equals(this.selectedDate);
  }

  isFree(date: NgbDate): boolean {
    for (const dat of this.allDates) {
      if (date.equals(dat.Date) && (dat.bookedSlots >= 1) && (dat.bookedSlots < dat.possibleSlots)) {
        return true;
      }
    }
    return false;
  }

  isCompletlyFree(date: NgbDate) {
    for (const dat of this.allDates) {
      if (date.equals(dat.Date) && (dat.bookedSlots === 0)) {
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
    for (const dat of this.allDates) {

      if (date.equals(dat.Date) && (dat.bookedSlots >= dat.possibleSlots)) {
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

  onDateSelection(date: NgbDate) {

    dateIsValid = true;
    this.selectedDate = date;
    console.log(dateIsValid);
    console.log(this.newAppointment);
    this.val();


    return false;
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
      startStunde: ['', [
        Validators.required
      ]],
      startMinute: ['', [
        Validators.required
      ]],
      slots: ['', [
        Validators.required
      ]]
    });
    this.newAppointment.valueChanges.subscribe(console.log);
  }

  getSlotString() {
    let out = '';
    if (this.selectedDate != null) {
      out += 'Slots: ' + '/';
      return out;
    }
  }

  get date() {
    return this.newAppointment.get('date');
  }

  get slots() {
    return this.newAppointment.get('slots');
  }

  get stunde() {
    return this.newAppointment.get('startStunde');
  }

  getSelectedDateToString() {
    if (this.selectedDate == null) {
      return null;
    } else {
      let out: String;
      out = 'Datum: ' + this.selectedDate.day + '/' + this.selectedDate.month + '/' + this.selectedDate.year;
      return out;
    }
  }

  async submitHandler() {
    this.loading = true;
    try {
      let time: number[];
      this.dateService.addDate(this.selectedDate.day, this.selectedDate.month, this.selectedDate.year, this.slots.value,
        [this.stunde.value, this.minute.value]).subscribe((messages) => {
        console.log(messages);
      });
    } catch (e) {
      console.log(e);

    }
    this.loading = false;
    this.success = true;
  }

  reload() {
    location.reload();
  }
}
