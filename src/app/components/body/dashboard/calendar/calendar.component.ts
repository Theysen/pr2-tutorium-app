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

class ServerDate {
  Date: NgbDate;
  startTime: string;
  endTime: string;
  possibleSlots: number;
  bookedSlots: number;

  constructor(year: number, month: number, day: number, startTime: string, endTime: string, possibleSlots: number, bookedSlots: number) {
    this.Date = new NgbDate(year, month, day);
    this.startTime = startTime;
    this.endTime = endTime;
    this.possibleSlots = possibleSlots;
    this.bookedSlots = bookedSlots;
  }

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  allDates: ServerDate[];
  selectedDate: ServerDate;
  newAppointment: FormGroup;
  loading = false;
  success = false;

  constructor(private calendar: NgbCalendar, private dateService: DateService, private fb: FormBuilder) {

    this.allDates = [];
    console.log('dates');
    this.dateService.getDates().subscribe((dates: Response) => {
      const generalDates: any = dates;
      for (const data of generalDates) {
        let newData: ServerDate;
        newData = new ServerDate(data.year, data.month, data.day, data.startTime, data.endTime, data.possibleSlots, data.bookedSlots);
        this.allDates.push(newData);
      }
    });
    console.log('dates');

  }

  onDateSelection(date: NgbDate) {
    for (const dat of this.allDates) {
      if (date.equals(dat.Date) && !this.isFull(date)) {
        console.log(typeof dat);
        this.selectedDate = dat;
        dateIsValid = true;
        this.val();
        return true;
      }
    }
    return false;
  }

  isSelected(date: NgbDate) {
    if (this.selectedDate === null) {
      return false;
    }
    return date.equals(this.selectedDate.Date);
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

  getSelectedDateToString() {
    if (this.selectedDate == null) {
      return null;
    } else {
      let out: String;
      out = 'Datum: ' + this.selectedDate.Date.day + '/' + this.selectedDate.Date.month + '/' + this.selectedDate.Date.year
      + ' - Raum: H299' + '\n'
      + ' zwischen: ' + this.selectedDate.startTime + ' und ' + this.selectedDate.endTime + ' Uhr';
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

  getSlotString() {
    let out = '';
    if (this.selectedDate != null) {
      out += 'Slots: ' + this.selectedDate.bookedSlots + '/' + this.selectedDate.possibleSlots;
      return out;
    }
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
        this.selectedDate.Date.day, this.selectedDate.Date.month,
        this.selectedDate.Date.year, this.group.value, this.msg.value).subscribe((message) => {
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
