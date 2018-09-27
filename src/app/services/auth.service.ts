import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(user) {
    return this.httpClient.post('http://localhost:4000/login', user);
  }

  getBookedSlots() {
    const headers = new HttpHeaders({
      'Content-Type': 'json/application',
      'Authorization': 'Bearer' + this.authToken
    });
    return this.httpClient.get('http://localhost:4000/bookedslots', {headers: headers});
  }

  storeUserData(username, token) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', username);
    this.authToken = token;
    this.user = username;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    location.reload();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
