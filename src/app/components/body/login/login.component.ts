import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  slots: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    localStorage.clear();
  }

  handleSubmit() {
    this.auth
      .authenticateUser({ username: this.username, password: this.password })
      .subscribe((result: any) => {
        if (result.token) {
          this.auth.storeUserData(result.token, result.user);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  logout() {
    this.auth.logout();
    location.reload();
  }
}
