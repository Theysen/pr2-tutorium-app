import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-slotoverview',
  templateUrl: './slotoverview.component.html',
  styleUrls: ['./slotoverview.component.css']
})
export class SlotoverviewComponent implements OnInit {
  slots: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getBookedSlots().subscribe(result => {
      this.slots = result;
    });
  }
}
