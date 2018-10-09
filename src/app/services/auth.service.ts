import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;
  user: string;

  private uri: string = 'http://localhost:4000/login';

  constructor(private http: HttpClient) {}

  authenticateUser(user) {
    return this.http.post(this.uri, user);
  }

  storeUserData(token, username) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', username);
    this.authToken = token;
    this.user = username;
  }

  public loggedIn(): boolean {
    const tokenHelper = new JwtHelperService();
    this.loadToken();
    return !tokenHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getBookedSlots() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'json/application',
      Authorization: 'Bearer ' + this.authToken
    });
    return this.http.get('http://localhost:4000/bookedslots', {
      headers: headers
    });
  }
}
