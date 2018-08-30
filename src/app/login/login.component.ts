import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";
import {HashingService} from "../hashing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loggedIn: boolean = false;

  getStatus(): boolean {
    return this.loggedIn;
  }

  loginUser(event) {

    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    const hashedPassword = this.hashing.getHashedString(password);

    this.authorization.login(username, hashedPassword);

  }

  constructor(private authorization: AuthorizationService, private hashing: HashingService) {
  }

  ngOnInit() {
  }

}
