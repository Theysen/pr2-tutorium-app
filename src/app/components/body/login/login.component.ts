import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.auth
      .authenticateUser({username: this.username, password: this.password})
      .subscribe((result: any) => {
        if (result.token) {
          this.auth.storeUserData(result.token, result.user);
          this.router.navigate(['/dashboard']).catch(err => console.log(err));
        }
      });
  }
}
