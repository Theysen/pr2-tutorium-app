import {Component, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../../../services/date.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SlotService} from "../../../../services/slot.service";


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
  slotId: any;

  constructor(private calendar: NgbCalendar, private slotService: SlotService, private dateService: DateService, private fb: FormBuilder) {

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

      let raumnummer = '';
      if (this.calendar.getWeekday(this.selectedDate.Date) === 1 || this.calendar.getWeekday(this.selectedDate.Date) === 5) {
        raumnummer = 'H1114';
      }
      if (this.calendar.getWeekday(this.selectedDate.Date) === 3) {
        raumnummer = 'H1008';
      }

      let out: String;
      out = 'Datum: ' + this.selectedDate.Date.day + '/' + this.selectedDate.Date.month + '/' + this.selectedDate.Date.year
        + ' - Raum: ' + raumnummer + '\n'
        + ' Uhrzeit: ' + this.selectedDate.appTime[0] + ':' + this.selectedDate.appTime[1];
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

    let raumnummer = '';
    if (this.calendar.getWeekday(this.selectedDate.Date) === 1 || this.calendar.getWeekday(this.selectedDate.Date) === 5) {
      raumnummer = 'H1114';
    }
    if (this.calendar.getWeekday(this.selectedDate.Date) === 3) {
      raumnummer = 'H1008';
    }


    this.loading = true;

    this.slotService.getIndex().subscribe(slotId => {
      this.slotId = slotId[0].index;

      try {
        let time: number[];
        this.dateService.bookSlot(this.selectedDate.Date.day, this.selectedDate.Date.month, this.selectedDate.Date.year, this.group.value, this.selectedDate.appTime, this.msg.value, raumnummer, this.slotId).subscribe((messages) => {
          console.log(messages);
        });
      } catch (e) {
        console.log(e);

      }

    });


    this.loading = false;
    this.success = true;
  }

  reload() {
    location.reload();
  }
}
