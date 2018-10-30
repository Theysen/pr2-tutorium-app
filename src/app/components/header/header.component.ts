import { Component, OnChanges, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private main: AppComponent, private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  ngOnInit() {
  }
}
