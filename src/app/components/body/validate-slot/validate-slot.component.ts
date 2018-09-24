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
  loading = false;
  sucess = false;
  constructor(private fb: FormBuilder, private dateService: DateService) { }
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


  async submitHandler() {
    this.loading = true;
    let out: string = '';

    try {
      this.dateService.getDates().subscribe((dates) => {
        let sth : any = dates;

        for(let dat of sth){
          for(let slot of dat.slots){
            let s2 = ''+slot.verifyId;
            console.log(s2);
            if(this.slotID.value === s2){
              out += slot.msg + ' ';
              console.log(slot);
            }
          }
        }
      });
      console.log(out);
    } catch (e) {
      console.error(e);
    }
    this.loading = false;
  }
}
