import {Component, Directive, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleNavbar=true;

  toggle(){
    this.toggleNavbar= !this.toggleNavbar;
  }
  title = 'pr2-tutorium-app';

}

