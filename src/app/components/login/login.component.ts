import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;
  slots: any;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe((result: any) => {
      if (result.token) {
        this.authService.storeUserData(result.user, result.token);
        this.getBookedSlots();
      }
    });

  }

  logout() {
    this.authService.logout();
  }

  getBookedSlots() {
    this.authService.getBookedSlots().subscribe(result => {
      this.slots = result;
    })
  }

}
