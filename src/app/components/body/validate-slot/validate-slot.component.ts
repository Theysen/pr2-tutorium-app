import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../../services/date.service";

@Component({
  selector: 'app-validate-slot',
  templateUrl: './validate-slot.component.html',
  styleUrls: ['./validate-slot.component.css']
})
export class ValidateSlotComponent implements OnInit {
  searchSlot: FormGroup;
  slot: any;
  loading = false;
  sucess = false;
  error = false;

  constructor(private fb: FormBuilder, private dateService: DateService) {
  }

  ngOnInit() {

    this.searchSlot = this.fb.group({
      slotID: ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]]
    });

  }

  get slotID() {
    return this.searchSlot.get('slotID');
  }

  getSlotInformation(): string {
    let out: string;
    out = '';
    if (this.slot != undefined) {

      out += 'Dieser Slot wurde gebucht von: ' + this.slot.bookedByGroup + ' - ' +
        'Datum:' + this.slot.date[0] + '/' + this.slot.date[1] + '/' + this.slot.date[2] + ' - Uhrzeit:' + this.slot.startTime[0] + ':' + this.slot.startTime[1] + 'Uhr' + ' - ' +
        'Raum: ' + this.slot.roomNumber;
    }
    return out;
  }


  async submitHandler() {
    this.loading = true;
    let out: string = '';

    try {
      this.dateService.getDates().subscribe((dates) => {
        let sth: any = dates;
        let found = false;

        for (let dat of sth) {


          let sth2: any = dat.date;


          for (let slot of dat.slots) {
            let s2 = '' + slot.verifyId;

            if (this.slotID.value === s2) {
              found = true;
              out += slot.msg + ' ';
              this.slot = slot;
              this.slot.date = sth2;

            }
          }
        }
        if (found) {
          this.sucess = true;
        }
        else {
          this.error = true;
        }
      });

    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }

  reload() {
    location.reload();
  }


}
