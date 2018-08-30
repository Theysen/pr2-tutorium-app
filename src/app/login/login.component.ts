import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser(event) {

    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    // const password = target.querySelector('#password').value;

    console.log(username + " ");
  }

  constructor() {
  }

  ngOnInit() {
  }

}
