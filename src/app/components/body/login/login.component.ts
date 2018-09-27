import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  slots: any;

  constructor(private auth: AuthService) {
  }


  ngOnInit() {
  }

  handleSubmit() {
    this.auth.authenticateUser({username: this.username, password: this.password})
      .subscribe((result: any) => {
        if (result.token) {
          this.auth.storeUserData(result.token, result.user);
        }
      });
  }

  getBookedSlots() {
    this.auth.getBookedSlots().subscribe(result => {
      this.slots = result;
    });
  }

  logout() {
    this.auth.logout();
  }

}
