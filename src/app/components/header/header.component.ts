import {Component, OnChanges, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private main:AppComponent) {
  }
  toggle(){
    this.main.toggle();
  }

  ngOnInit() {
  }


}
