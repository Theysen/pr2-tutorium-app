import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../../../services/date.service';

@Component({
  selector: 'app-show-bookings',
  templateUrl: './show-bookings.component.html',
  styleUrls: ['./show-bookings.component.css']
})
export class ShowBookingsComponent implements OnInit {
  constructor(private dateService: DateService) {
  }

  slots: any;


  ngOnInit() {
    this.dateService.getDates().subscribe(result => this.slots = result);
  }

}
