import {Component, OnChanges, OnInit} from '@angular/core';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public loginUser() {
    this.loginService.loginUser();
  }

  public getLoginStatus() {
    this.loginService.loggedIn();
  }

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }


}
